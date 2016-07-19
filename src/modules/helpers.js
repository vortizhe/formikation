// HELPERS FUNCTIONS UTILITIES ================
// Returns class depending on type adding suffix
function getClass($el, suffix){
  var prefix = ($el.is('input:file')) ? 'fk-file' : 'fk-select';
  return prefix + suffix;
}

// ?
function changed($el,selectSpan) {
  var currentSelected = $el.find(':selected'),
      selectSpanInner = selectSpan.children(':first'),
      html = currentSelected.html() || $el.val();

  selectSpanInner.html(html);

  if (currentSelected.prop('disabled')) {
    selectSpan.addClass(getClass($el, 'fk-disable-option'));
  } else {
    selectSpan.removeClass(getClass($el, 'fk-disable-option'));
  }

  // Add placeholder class to span if:
  // - Is first option && has NO value
  // - Is first option && HAS value && value is empty
  if (
    $el[0].selectedIndex < 1 &&
    ( !currentSelected[0].hasAttribute('value') || currentSelected.val().length === 0 )
   ) {
    selectSpanInner.addClass('fk-is-placeholder');
  } else {
    selectSpanInner.removeClass('fk-is-placeholder');
  }

  setTimeout(function() {
    selectSpan.removeClass(getClass($el, 'Open'));
    $(document).off('mouseup.' + getClass($el, 'Open'));
  }, 60);
}

// Check if element is disabled
function is_disabled($el, $target) {
  if ($el.prop('disabled')) {
    $target.addClass('disabled');
  } else {
    $target.removeClass('disabled');
  }
}
