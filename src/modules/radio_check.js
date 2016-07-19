// Aquí se procesan los checks
processRadioCheck: function(el) {
  var $el = $(el),
      $label = $el.closest('label');

  // Add class with sprite
  if ($el.is(':checkbox')) {
    $label.addClass('fk-check');
  } else {
    $label.addClass('fk-radio');
  }
  if (this.defaults.mapClass) {
    $label.addClass($el.attr('class'));
  }
  if (this.defaults.mapStyle) {
    $label.attr('style', $el.attr('style'));
  }

  $el.on('formikation.update', function() {

    if ($el.prop('checked')) {
      $el.closest('form').find(':radio[name="'+$el.attr('name')+'"]').closest('label').removeClass('checked');
      $label.addClass('checked');
    } else {
      $label.removeClass('checked');
    }

    formikation.is_disabled($el, $label);
  });

  $el.on('click, change', function() {
    $el.trigger('formikation.update');
  });

  $el.trigger('formikation.update');
},
