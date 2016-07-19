// Aquí se procesan los checks
function processRadioCheck($el, options) {
  var $label = $el.closest('label');

  // Add class with sprite
  if ($el.is(':checkbox')) {
    $label.addClass('fk-check');
  } else {
    $label.addClass('fk-radio');
  }
  if (options.mapClass) {
    $label.addClass($el.attr('class'));
  }
  if (options.mapStyle) {
    $label.attr('style', $el.attr('style'));
  }

  $el.on('formikation.update', function() {

    if ($el.prop('checked')) {
      $el.closest('form').find(':radio[name="' + $el.attr('name') + '"]').closest('label').removeClass('checked');
      $label.addClass('checked');
    } else {
      $label.removeClass('checked');
    }

    is_disabled($el, $label);
  });

  $el.on('click, change', function() {
    $el.trigger('formikation.update');
  });

  $el.trigger('formikation.update');
}
