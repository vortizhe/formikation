// Aquí se inicializa el tema de verdad
function init($elements, params) {

  // filter out <= IE6
  if (typeof document.body.style.maxHeight === 'undefined') {
    return false;
  }

  // Merge the params to default
  var options = $.extend(defaults, params);

  // Process elements in collection
  $elements.each(function() {
    var $el = $(this);
    // Check / radio
    if ($el.is(':checkbox, :radio')) {
      processRadioCheck.call(this, $el, options);
    // Select
  } else if ($el.is('select')) {
      processSelects.call(this, $el, options);
    // File input
  } else if ($el.is('input:file')) {
      processInputFile.call(this, $el, options);
    // Nor to be processed
    } else {
      // Do nothing?
    }
  });
}
