$(document).ready(function() {

  // La magia aquí
  $('select, input:file, input:checkbox, input:radio').formikation({
    mapClass: true,
    mapStyle: true
  });

});
