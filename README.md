# TP7 de Programación Multimedial 4: Encontrando Vulnerabilidades

|                        |                                 |
| ---------------------- | ------------------------------- |
| Integrantes por grupo: | 2                               |
| Se aprueba con         | 6                               |
| Fecha de entrega       | Miércoles 2 de Octubre, 23:59 hs |
| Fecha de re-entrega    | Miércoles 9 de Octubre, 23:59 hs |

## Metodología

### Objetivos

- Que aprendan a identificar vulnerabilidades en JS/TS
- Que aprendan a interpretar código incompleto
- Que aprendan a escribir (e interpretar) un reporte de vulnerabilidades

### Comentarios

Recuerden que, por lo general, la solución más simple es la mejor. 

Y la mas segura.

----

## Entrega

### Mail

Por favor, mándenme un email a <me@diegofreijo.com> cuando tengan todo listo.

En el mail agreguen:

- El link a la etiqueta `tp7`

### Repositorio

Esta vez el repositorio deberá ser **PRIVADO**. Por lo que para que yo lo pueda ver me van a tener que agregar como un tercer colaborador. Mi nombre de usuario en GitHub es `diegofreijo`.

No espero más que 1 archivo en el repo, el reporte de vulnerabilidades en formato markdown.

Pueden usar el mismo repo para el TP7 y TP8.

Agreguen una `tag` en el repositorio que se llame `tp7`. Ese commit es el que voy a corregir.

### Oral

Cada pareja va a pasar al frente a exponer alguna/s de la/s vulnerabilidad/es que encontraron. Por ahora no tienen que preparar nada, pero asegúrense de entender bien las cosas que reportan para que no los agarre desprevenidos con alguna pregunta.

----

## Requerimientos

Después de este TP van a terminar escribiendo código segurísimo. Capaces de dejarme sin trabajo, y con las habilidades necesarias para molestar a sus compañeros de trabajo explicándoles que fácil sería romperles sus servicios.

En este repo van a encontrar un archivo con el código de una API. Su objetivo es analizarlo en búsqueda de todas las vulnerabilidades que puedan.

- Cada vulnerabilidad correcta que encuentren va a sumarles `x` puntos.
- Cada vulnerabilidad incorrecta que encuentren va a sumarles `y` puntos.

No les quiero spoilear cuantas vulnerabilidades hay, así que los valores de `x` e `y` los van a saber después del RTP7.

El resultado de la auditoría va a ser un reporte, un archivo markdown que van a agregar al repo. En este archivo van a listar las vulnerabilidades que vayan encontrando. Cada vulnerabilidad reportada va a seguir el template que les estoy dejando abajo. 

#### Template de Vulnerabilidad

```md

## <nombre vuln> en <funcion o endpoint donde se la encontró>

Tipo: <en cual de las OWASP top 10 la encasillarían>

### Prueba de Concepto

<Acá va el codigo o screenshot que muestre el problema>

### Riesgo: <bajo | medio | alto>

<Explicar en menos de 3 oraciones que es lo que podría pasar de malo si se lo deja como está, o cómo algun atacante podría abusar del problema. Pueden usar mas de 3 oraciones pero les pongo ese número para que vean que no espero una gran redacción, si no algo corto y directo>

### Recomendaciones

<Que deberían hacer los desarrolladores para corregir el error. Pueden indicar que linea de codigo cambiar, agregar o borrar>

```
