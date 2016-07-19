(function($, undefined) {
  'use strict';

  if (typeof Formikation !== 'undefined') {
    return;
  }

  var $doc = $(document),
      defaults = {
        mapClass: true,
        mapStyle: true
      };

  //=require modules/core.js
  //=require modules/helpers.js
  //=require modules/radio_check.js
  //=require modules/select.js
  //=require modules/input_file.js


  window.formikation = {
    init: init
  };

  // Export jquery plugin
  $.fn.formikation = function(params) {
    formikation.init(this, params);
  };
})(jQuery);
