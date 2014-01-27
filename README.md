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

## Conflictos / precauciones varias

## TO-DO

- Asignar una clase `formikated-already` que permita filtrar los que ya están procesados y que no los vuelva a procesar.
- Crear un método que haga `check` de radios y checkboxes programáticamente.
- ¿Hacer un método que "desformike"?

