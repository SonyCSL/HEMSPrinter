(function() {
  var init = function() {
    $('#out, #in, #off').on('touchstart touchend', touchEventHandler);
  };
 
  var touchEventHandler = function(e) {
    if (e.type === 'touchstart') {
      $(this).addClass('tapstyle');
    } else {
      $(this).removeClass('tapstyle');
    }
  };
 
  $(init); // onload
})();