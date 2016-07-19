formikation = {

  // Internal variables / DOM caching / etc.
  dat: {
    els: null // elements
  },

  // Default settings / params
  defaults: {
    mapClass: true,
    mapStyle: true
  },

  //=require modules/*
  
  // Aquí se inicializa el tema de verdad
  init: function(params) {

    // filter out <= IE6
    if (typeof document.body.style.maxHeight === 'undefined') {
      return this;
    }

    // Merge the params to default
    this.defaults = $.extend(this.defaults, params);

    // Process elements in collection
    this.dat.els.each( function(idx) {
      // Check / radio
      if ($(this).is(':checkbox, :radio')) {
        formikation.processRadioCheck(this);
      // Select
      } else if ($(this).is('select')) {
        formikation.processSelects(this);
      // File input
      } else if ($(this).is('input:file')) {
        formikation.processInputFile(this);
      // Nor to be processed
      } else {
        // Do nothing?
      }
    });
  },

  // HELPERS FUNCTIONS UTILITIES ================
  // Returns class depending on type adding suffix
  getClass: function(el, suffix){
    var prefix = (el.is('input:file')) ? 'fk-file' : 'fk-select';
    return prefix + suffix;
  },

  // ?
  changed: function($el,selectSpan) {
    var currentSelected = $el.find(':selected'),
        selectSpanInner = selectSpan.children(':first'),
        html = currentSelected.html() || $el.val();

    selectSpanInner.html(html);

    if (currentSelected.prop('disabled')) {
      selectSpan.addClass(formikation.getClass($el, 'fk-disable-option'));
    } else {
      selectSpan.removeClass(formikation.getClass($el, 'fk-disable-option'));
    }

    // Add placeholder class to span if:
    // - Is first option && has NO value
    // - Is first option && HAS value && value is empty
    if (
      $el[0].selectedIndex < 1 &&
      ( !currentSelected[0].hasAttribute('value') ||  currentSelected.val().length === 0 )
     ) {
      selectSpanInner.addClass('fk-is-placeholder');
    } else {
      selectSpanInner.removeClass('fk-is-placeholder');
    }

    setTimeout(function() {
      selectSpan.removeClass(formikation.getClass($el, 'Open'));
      $(document).off('mouseup.'+formikation.getClass($el, 'Open'));
    }, 60);
  },

  // Check if element is disabled
  is_disabled: function($el, $target) {
    if ($el.prop('disabled')) {
      $target.addClass('disabled');
    } else {
      $target.removeClass('disabled');
    }
  }
};

// JQuery hooks
(function ($) {
  $.fn.formikation = function(params) {
    formikation.dat.els = this; // JQuery elements
    formikation.init(params);
  };
})(jQuery);
