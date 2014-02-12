# formication
### Simple form beautifier

*formikation* es un sencillo _embellecedor_ de formularios que emplea un sprite minísculo e intenta meter el mínimo HTML adicional posible para hacer los formularios bonitos. *Precisa JQuery*.

Los elementos que procesa son:  
`input:checkbox`  
`input:radiobutton`  
`input:file`  
`select`

### Ficheros requeridos

`JQuery 1.9+`  
`formikation.js`  
`formikation.css`  
`formikation-sprite.css`

## Requerimientos de HTML

Los radiobutton y los checkboxes deben tener el `label` rodeándolos, de esta forma:

    <label>
      <input type="checkbox" name="check" id="check">
      Label del checkbox
    </label>
    
    <label>
      <input type="radio" name="radio" id="radio">
      Label del checkbox
    </label>

## Wrapper del file input

Para estilar el file input se genera un `wrapper`alrededor que tiene este formato

    <div class="fk-file-input">
      <p>Select file...</p>
      // Debajo el input original
      <input type="file" name="sample-file-input" id="sample-file-input">
    </div>

## Ejemplos de uso generales

Se inicializa llamando a la función `formikation` directamente sobre un selector de Jquery de la siguiente forma:

    $(document).ready(function() {
    
      $('select, input:file, input:checkbox, input:radio').formikation();
    
    });
    
Para pasar los parámetros de inicializción _(detallados más adelante)_ lo haríamos igualmente pasándolos en la inicialización.

    $(document).ready(function() {
    
      // La magia aquí
      $('select, input:file, input:checkbox, input:radio').formikation({
        mapClass: true,
        mapStyle: true
      });
    
    });

## IE8

IE8 tiene dificultades checkeando / descheckeando radios y buttons _'invisibles'_ con `display: none;` o con  `visible:hidden` así que la solución es ponerlos en `absolute` y con un `left:-9999px` sacándolos de la pantalla.

Otra peculiaridad de IE8 es que **no actualiza** los `pseudo-elementos` como el `:before` y el `:after` a no ser que el `content` cambie.

## Conflictos / precauciones varias

To come.

## TO-DO

- Crear un método que haga `check` de radios y checkboxes programáticamente.
- ¿Hacer un método que "desformike"?

