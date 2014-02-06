/*

  Formikation, simple form beautifier
  By Víctor Ortiz @vorthize

    Collaborators:
    Carlos Cabo @putuko

  V.0.1 (2014/01/20)
  http://github.com

*/

;formikation = {

  // Internal variables / DOM caching / etc.
  dat: {
    els: null // elements
  },

  // Default settings / params
  defaults: {
    mapClass: true,
    mapStyle: true
  },

  // Aquí se inicializa el tema de verdad
  init: function(params) {

    // filter out <= IE6
    if (typeof document.body.style.maxHeight === 'undefined') {
      return this;
    }

    // Merge the params to default
    this.defaults = $.extend(this.defaults, params);

    // Process elements in collection
    this.dat.els.each( function( idx ) {
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

  // Aquí se procesan los checks
  processRadioCheck: function(el) {
    var
      $el = $(el),
      $label = $el.closest('label');

    // Add class with sprite
    if ($el.is(':checkbox')) {
      $label.addClass('fk-check');
    } else {
      $label.addClass('fk-radio');
    }

    $el.on('click', function() {
      $el.trigger('update');
    });

    $el.on('update', function () {
      var
        $el = $(el),
        $label = $el.closest('label');

      if ($el.prop('checked')) {
        $label.addClass('checked');
        $(':radio[name="'+$el.attr('name')+'"]').not($el).trigger('update');
      } else {
        $label.removeClass('checked');
      }
    });

    // if ($el.is(':radio')) {
    $el.trigger('update');
    // }
  },

  // Process selects
  processSelects: function(el) {
    var
     $el = $(el),
      selectInnerSpan = $('<span />').addClass(this.getClass($el, '-label')),
      selectSpan = $('<span />'),
      prefix = ($el.is('input:file')) ? 'file' : 'select';

    $el.after(selectSpan.append(selectInnerSpan));

    selectSpan.addClass(prefix);

    if (this.defaults.mapClass) {
      selectSpan.addClass($el.attr('class'));
    }
    if (this.defaults.mapStyle) {
      selectSpan.attr('style', $el.attr('style'));
    }

    $el.addClass('hasCustomSelect')
    .on('update', function () {

      formikation.changed($el,selectSpan);
      formikation.updateSelectWH($el);

    })
    .on('change', function () {
        selectSpan.addClass(formikation.getClass($el, 'Changed'));
        formikation.changed($el,selectSpan);
        formikation.updateSelectWH($el);
    })
    .on('keyup', function (e) {
      if(!selectSpan.hasClass(formikation.getClass($el, 'Open'))){
        $el.blur();
        $el.focus();
      } else{
        if(e.which==13||e.which==27){
          formikation.changed($el,selectSpan);
        }
      }
    })
    .on('mousedown', function (e) {
      selectSpan.removeClass(formikation.getClass($el, 'Changed'));
    })
    .on('mouseup', function (e) {
      if( !selectSpan.hasClass(formikation.getClass($el, 'Open'))){
        // if FF and there are other selects open, just apply focus
        if($('.'+formikation.getClass($el, 'Open')).not(selectSpan).length>0 && typeof InstallTrigger !== 'undefined'){
          $el.focus();
        }else{
          selectSpan.addClass(formikation.getClass($el, 'Open'));
          e.stopPropagation();
          $(document).one('mouseup.'+formikation.getClass($el, 'Open'), function (e) {
            if( e.target != $el.get(0) && $.inArray(e.target,$el.find('*').get()) < 0 ){
              $el.blur();
            }else{
              formikation.changed($el,selectSpan);
            }
          });
        }
      }
    })
    .focus(function () {
      selectSpan.removeClass(formikation.getClass($el, 'Changed')).addClass(formikation.getClass($el, 'Focus'));
    })
    .blur(function () {
      selectSpan.removeClass(formikation.getClass($el, 'Focus')+' '+formikation.getClass($el, 'Open'));
    })
    .hover(function () {
      selectSpan.addClass(formikation.getClass($el, 'Hover'));
    }, function () {
      selectSpan.removeClass(formikation.getClass($el, 'Hover'));
    })
    .trigger('update');
  },

  // Process input file
  processInputFile: function(sel) {
    //
  },

  // Updates select width to match span
  updateSelectWH: function(sel) {
    var
      $sel = $(sel),
      $spa = $sel.next('span');

    // Set to inline-block before calculating outerHeight
    $spa.css({
      display: 'inline-block'
    });

    var
      w = parseInt($spa.outerWidth(), 10),
      h = parseInt($spa.outerHeight(), 10);

    if ($sel.attr('disabled')) {
      $spa.addClass(formikation.getClass($sel, 'Disabled'));
    } else {
      $spa.removeClass(formikation.getClass($sel, 'Disabled'));
    }

    $sel.css({
      '-webkit-appearance': 'menulist-button',
      width: w,
      height: h,
      position: 'absolute',
      opacity: 0,
      fontSize: $spa.css('font-size')
    });
  },

  // HELPERS FUNCTIONS UTILITIES ================
  // Returns class depending on type adding suffix
  getClass: function(el, suffix){
    var prefix = (el.is('input:file')) ? 'file' : 'select';
    return prefix + suffix;
  },

  // ?
  changed: function($el,selectSpan) {
    var currentSelected = $el.find(':selected'),
    selectSpanInner = selectSpan.children(':first'),
    html = currentSelected.html() || $el.val();

    selectSpanInner.html(html);

    if (currentSelected.attr('disabled')) {
      selectSpan.addClass(getClass($el, 'DisabledOption'));
    } else {
      selectSpan.removeClass(formikation.getClass($el, 'DisabledOption'));
    }

    setTimeout(function() {
      selectSpan.removeClass(formikation.getClass($el, 'Open'));
      $(document).off('mouseup.'+formikation.getClass($el, 'Open'));
    }, 60);
  }

};

// JQuery hooks
(function ($) {
  $.fn.formikation = function(params) {
    formikation.dat.els = this; // JQuery elements
    formikation.init(params);
  };
})(jQuery);
