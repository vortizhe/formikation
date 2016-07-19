// Process selects
processSelects: function(el) {
  var
    $el = $(el),
    selectInnerSpan = $('<span />').addClass('fk-select-label'),
    selectSpan = $('<span />'),
    prefix = 'fk-select';

  $el.after(selectSpan.append(selectInnerSpan));

  selectSpan.addClass(prefix);

  if (this.defaults.mapClass) {
    selectSpan.addClass($el.attr('class'));
  }
  if (this.defaults.mapStyle) {
    selectSpan.attr('style', $el.attr('style'));
  }

  $el.addClass('has-fk-select')
     .on('formikation.update', function() {
       formikation.changed($el,selectSpan);
       formikation.updateSelectWH($el);
       formikation.is_disabled($el, selectSpan);
     })
     .on('change', function() {
        selectSpan.addClass(formikation.getClass($el, 'Changed'));
        $el.trigger('formikation.update');
     })
     .on('keyup', function(e) {
       if (!selectSpan.hasClass(formikation.getClass($el, 'Open'))) {
         $el.blur();
         $el.focus();
       } else {
         if (e.which==13||e.which==27) {
           formikation.changed($el,selectSpan);
         }
       }
     })
     .on('mousedown', function(e) {
       selectSpan.removeClass(formikation.getClass($el, 'Changed'));
     })
     .on('mouseup', function(e) {
       if ( !selectSpan.hasClass(formikation.getClass($el, 'Open'))) {
         // if FF and there are other selects open, just apply focus
         if ($('.'+formikation.getClass($el, 'Open')).not(selectSpan).length>0 && typeof InstallTrigger !== 'undefined') {
           $el.focus();
         } else {
           selectSpan.addClass(formikation.getClass($el, 'Open'));
           e.stopPropagation();
           $(document).one('mouseup.'+formikation.getClass($el, 'Open'), function(e) {
             if ( e.target != $el.get(0) && $.inArray(e.target,$el.find('*').get()) < 0 ) {
               $el.blur();
             } else {
               formikation.changed($el,selectSpan);
             }
           });
         }
       }
     })
     .focus(function() {
       selectSpan.removeClass(formikation.getClass($el, '-changed')).addClass(formikation.getClass($el, '-focus'));
     })
     .blur(function() {
       selectSpan.removeClass(formikation.getClass($el, '-focus')+' '+formikation.getClass($el, '-open'));
     })
     .hover(function() {
       selectSpan.addClass(formikation.getClass($el, '-hover'));
     }, function() {
       selectSpan.removeClass(formikation.getClass($el, '-hover'));
     })
     .trigger('formikation.update');
},

// Updates select width to match span
updateSelectWH: function(sel) {
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
},
