$('form').submit(function(){
  if ($('input').val() !== '' ) {
    var input_value = $('input').val();
	var newElement = '<li>' + input_value  + '</li>';
  $('ul').append(newElement);
	$('li:last').focus();
	$('li:last').addClass("li-change");

  }

  $('input').val(''); // Text weg
  $('#enter-new').addClass('editor');
  $('#textfield').blur();
  return false;
});

// Neues Item anlegen
$(document).bind('keydown', 'ctrl+a', function(){

  $('#enter-new').removeClass('editor');
  $('#textfield').focus();
});

// Erstes Item löschen
$(document).bind('keydown', 'ctrl+1', function(){
      $("li:first").remove();
});

// Letztes Item löschen
$(document).bind('keydown', 'ctrl+2', function(){
      $("li:last").remove();
});

// Erstes Item erledigt
$(document).bind('keydown', 'alt+1', function(){
      $("li:first").toggleClass('strikethrough');
});

// select first item
$(document).bind('keydown', 'ctrl+3', function(){
      $(".selected").removeClass('selected');
      $("li:first").addClass('selected');
});

// select next item
$(document).bind('keydown', 'ctrl+5', function(){
  if($(".selected").length === 0){
      $("li:first").addClass('selected');
  } else{
    if($("li:last").hasClass('selected')){
      $("li:last").removeClass('selected');
      $("li:first").addClass('selected');

    } else{
      $(".selected").removeClass('selected').next().addClass('selected');
    }
  }

});

// select prev item
$(document).bind('keydown', 'ctrl+4', function(){
  if($(".selected").length === 0){
      $("li:last").addClass('selected');
  } else{
    if($("li:first").hasClass('selected')){
      $("li:first").removeClass('selected');
      $("li:last").addClass('selected');
    } else{
      $(".selected").removeClass('selected').prev().addClass('selected');
    }
  }
});

// delete selected item
$(document).bind('keydown', 'ctrl+6', function(){
      $(".selected").remove();
});

// mark selected item as done
$(document).bind('keydown', 'ctrl+7', function(){
      $(".selected").toggleClass('strikethrough');
});
