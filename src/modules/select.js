// Process selects
function processSelects($el, options) {
  var selectInnerSpan = $('<span />').addClass('fk-select-label'),
      selectSpan = $('<span />'),
      prefix = 'fk-select';

  $el.after(selectSpan.append(selectInnerSpan));

  selectSpan.addClass(prefix);

  if (options.mapClass) {
    selectSpan.addClass($el.attr('class'));
  }
  if (options.mapStyle) {
    selectSpan.attr('style', $el.attr('style'));
  }

  $el.addClass('has-fk-select')
     .on('formikation.update', function() {
       changed($el,selectSpan);
       updateSelectWH($el);
       is_disabled($el, selectSpan);
     })
     .on('change', function() {
        selectSpan.addClass(getClass($el, 'Changed'));
        $el.trigger('formikation.update');
     })
     .on('keyup', function(e) {
       if (!selectSpan.hasClass(getClass($el, 'Open'))) {
         $el.blur();
         $el.focus();
       } else {
         if (e.which==13 || e.which==27) {
           changed($el,selectSpan);
         }
       }
     })
     .on('mousedown', function(e) {
       selectSpan.removeClass(getClass($el, 'Changed'));
     })
     .on('mouseup', function(e) {
       if ( !selectSpan.hasClass(getClass($el, 'Open'))) {
         // if FF and there are other selects open, just apply focus
         if ($('.' + getClass($el, 'Open')).not(selectSpan).length > 0 && typeof InstallTrigger !== 'undefined') {
           $el.focus();
         } else {
           selectSpan.addClass(getClass($el, 'Open'));
           e.stopPropagation();
           $(document).one('mouseup.'+getClass($el, 'Open'), function(e) {
             if ( e.target != $el.get(0) && $.inArray(e.target,$el.find('*').get()) < 0 ) {
               $el.blur();
             } else {
               changed($el,selectSpan);
             }
           });
         }
       }
     })
     .focus(function() {
       selectSpan.removeClass(getClass($el, '-changed')).addClass(getClass($el, '-focus'));
     })
     .blur(function() {
       selectSpan.removeClass(getClass($el, '-focus')+' '+getClass($el, '-open'));
     })
     .hover(function() {
       selectSpan.addClass(getClass($el, '-hover'));
     }, function() {
       selectSpan.removeClass(getClass($el, '-hover'));
     })
     .trigger('formikation.update');
}

// Updates select width to match span
function updateSelectWH(sel) {
  var $sel = $(sel),
      $spa = $sel.next('span');

  $sel.css({
    '-webkit-appearance': 'menulist-button',
    width: parseInt($spa.outerWidth(), 10),
    height: parseInt($spa.outerHeight(), 10),
    position: 'absolute',
    opacity: 0,
    fontSize: $spa.css('font-size')
  });
}
