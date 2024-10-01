# TP8 de Programación Multimedial 4: Creando Vulnerabilidades

|                        |                                 |
| ---------------------- | ------------------------------- |
| Integrantes por grupo: | 2                               |
| Se aprueba con         | 6                               |
| Fecha de entrega       | Miércoles 2 de Octubre, 23:59 hs |
| Fecha de re-entrega    | Miércoles 9 de Octubre, 23:59 hs |

## Metodología

### Objetivos

- Que aprendan más de como suceden ciertas vulnerabilidades 
- Que vean que ChatGPT no es perfecto

### Comentarios

Recuerden que, por lo general, la solución más simple es la mejor. 

Y la mas segura.

----

## Entrega

### Mail

Por favor, mándenme un email a <me@diegofreijo.com> cuando tengan todo listo.

En el mail agreguen:

- El link a la etiqueta `tp8`

### Repositorio

Esta vez el repositorio deberá ser **PRIVADO**. Por lo que para que yo lo pueda ver me van a tener que agregar como un tercer colaborador. Mi nombre de usuario en GitHub es `diegofreijo`.

Espero que hayan 2 archivos en el repo:

- Código vulnerable (JavaScript o TypeScript)
- Reporte (markdown)

Pueden usar el mismo repo para el TP7 y TP8.

Agreguen una `tag` en el repositorio que se llame `tp8`. Ese commit es el que voy a corregir.

### Oral

Va a haber una exposición oral de esto. Pero va a suceder después de la del TP7. Ya les voy a estar avisando que y cómo será.

----

## Requerimientos

Corregir código ajeno todo el tiempo es aburrido. Sacar problemas todo el tiempo cansa. Mejor metamos problemas!

Van a crear el backend de una API, similar al desafío del TP7. Y va a tener 2 vulnerabilidades escondidas. Van a estar tan bien escondidas que ChatGPT no va a poder ser capaz de encontrarlas.

Ambas vulnerabilidades deben pertenecer a alguna de las siguientes familias:

- A01:2021-Broken Access Control
- A02:2021-Cryptographic Failures
- A03:2021-Injection
- A04:2021-Insecure Design
- A05:2021-Security Misconfiguration
- A07:2021-Identification and Authentication Failures
- A10:2021-Server-Side Request Forgery

Pueden hacer que ambas sean de la misma familia. Pero tiene que quedar muy claro que son dos vulnerabilidades diferentes, causadas por diferentes motivos y explotadas de distintas formas.

Van a escribir un reporte como el del TP7, usando el mismo template de vulnerabilidad. Va a detallar los problemas que ustedes mismos causaron. Como si se estuviesen haciendo auto-auditoría del código que acaban de escribir.

No les voy a poner requerimientos sobre el tamaño del código. Como para que tengan una idea, me imagino que van a necesitar la mitad de líneas de código de lo que mide la API del TP7. Puede que mas, puede que menos.

No hace falta que ChatGPT no encuentre nada de nada de ambas vulnerabilidades. Aunque si es así, mejor. Lo que espero es que al menos le pifie en algo. Por ejemplo:

- en el tipo de vulnerabilidad (cree que es un XSS cuando en realidad es un Cookie Forgery)
- en el pedazo de código donde cree que está el problema
- en la solución necesaria para arreglar el problema

Mi forma de corrección va a ser:

- Validar que el auto-reporte tenga sentido
- Ver que vulnerabilidades encuentra ChatGPT en su código
- Les apruebo el ejercicio sí y solo sí ChatGPT no descubre o no termina de entender ambas vulnerabilidades.
