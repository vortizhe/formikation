// Process input file
function processInputFile($el, options) {
  var $div = $('<div class="fk-file-input">'),
      text = $el.attr('data-text');

  $el.on('change', function(e) {
    var fn = $el.val().replace(/C:\\fakepath\\/i, '');
    if (!fn) {
      fn = text;
    }
    $el.prev('p').html(fn);
  });

  is_disabled($el, $div);
  $el.wrap($div.attr('data-text', text)).parent().prepend('<p>' + text + '</p>');
}
