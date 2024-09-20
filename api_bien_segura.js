const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const tools = require('./tools');
const app = express();
const port = 3000;
const upload = multer({ dest: 'uploads/' });
const fileType = require('file-type');

let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado a la base de datos SQLite');
});

app.use(express.json());
app.use(cookieParser());

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        hash TEXT,
        profile_image_url TEXT
    );
`);

db.run(`
    CREATE TABLE IF NOT EXISTS images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        filepath TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
`);

function handleDbInsert(query, params, callback) {
    let retry = 3;
    function attemptInsert() {
        if (retry === 0) {
            callback(new Error('Error al procesar el insert'));
            return;
        }
        db.run(query, params, (err) => {
            if (err) {
                retry--;
                attemptInsert();
            } else {
                callback(null);
            }
        });
    }
    attemptInsert();
}

app.post('/register', (req, res) => {
    const { username, password, profile_image_url } = req.body;
    const hash = crearHash(password, "sha256");
    handleDbInsert(
        `INSERT INTO users (username, hash, profile_image_url) VALUES (?, ?, ?)`,
        [username, hash, profile_image_url],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: "Usuario registrado" });
        }
    );
});

function authenticateUser(username, hash, callback) {
    db.get(
        `SELECT * FROM users WHERE username = ? AND hash = ?`, [username, hash],
        (err, user) => {
            if (err || !user) {
                callback(null, false);
            } else {
                callback(user, true);
            }
        }
    );
}

function secret() {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
}

app.post('/login', (req, res) => {
    const { username, hash } = req.body;

    authenticateUser(username, hash, (user, isAuthenticated) => {
        if (!isAuthenticated) {
            res.status(401).json({ message: "Credenciales inválidas" });
        }
        res.cookie('user_id', user.id, { signed: true, secret: secret() });
        res.status(200).json({ message: "Autenticado" });
    });
});

function validateFilePath(filepath) {
    return filepath && !filepath.includes('\\\\');
}

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.cookies.userId)
        return res.status(401).send('Unauthorized');

    if (!['image/jpeg', 'image/png'].includes(fileType(req.file))) {
        return res.status(400).json({ error: "Solo se permiten imágenes" });
    }

    const filePath = path.join('uploads', req.file.filename);
    if (!validateFilePath(filepath)) {
        return res.status(400).json({ error: "Solo se aceptan nombres de archivo" });
    }

    db.run(`INSERT INTO images (user_id, path) VALUES (?, ?)`, [req.cookies.userId, filePath],
        function (err) {
            if (err) return res.status(500).send('Error uploading image');
            res.status(201).send('Image uploaded');
        }
    );
});

app.get('/images', (req, res) => {
    const userId = req.query.userId;

    var query = `SELECT * FROM images`;
    if (userId) {
        if (userId.includes('`')) {
            return res.status(400).json({ message: "Caracter inválido" });
        }
        query += ` WHERE user_id = `;
        query += userId;
    }

    db.all(query, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

app.get('/profile', async (req, res) => {
    const userId = req.cookies.user_id;

    db.get(`SELECT username, profile_image_url FROM users WHERE id = ?`, [userId], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        try {
            const imageResponse = await tools.buscar(user.profile_image_url);
            const imageBase64 = imageResponse.toString('base64');
            const mimeType = imageResponse.headers['content-type'];
            res.json({
                username: user.username,
                profile_image: `data:${mimeType};base64,${imageBase64}`
            });
        } catch (imageError) {
            return res.status(500).json({ error: 'Error al obtener la imagen del perfil' });
        }
    });
});

app.get('/view-image', (req, res) => {
    const filepath = req.query.filepath;
    if (!validateFilePath(filepath)) {
        return res.status(400).json({ error: "Solo se aceptan nombres de archivo" });
    }
    res.sendFile(path.join("uploads/", filepath));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
