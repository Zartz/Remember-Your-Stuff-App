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
$(document).bind('keydown', 'ctrl+a', function(event){
  event.preventDefault(); //verhindert das default Verhalten des Browsers wie Tabwechsel
  $('#enter-new').removeClass('editor');
  $('#textfield').focus();
});

// Erstes Item löschen
$(document).bind('keydown', 'ctrl+1', function(event){
	  event.preventDefault();
      $("li:first").remove();
});

// Letztes Item löschen
$(document).bind('keydown', 'ctrl+2', function(event){
	  event.preventDefault();
      $("li:last").remove();
});

// Erstes Item erledigt
$(document).bind('keydown', 'alt+1', function(event){
	  event.preventDefault();
      $("li:first").toggleClass('strikethrough');
});

// select first item
$(document).bind('keydown', 'ctrl+3', function(event){
	  event.preventDefault();
      $(".selected").removeClass('selected');
      $("li:first").addClass('selected');
});

// select next item
$(document).bind('keydown', 'ctrl+5', function(event){
	  event.preventDefault();
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
$(document).bind('keydown', 'ctrl+4', function(event){
	  event.preventDefault();
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
$(document).bind('keydown', 'ctrl+6', function(event){
	  event.preventDefault();
      $(".selected").remove();
});

// mark selected item as done
$(document).bind('keydown', 'ctrl+7', function(event){
	  event.preventDefault();
      $(".selected").toggleClass('strikethrough');
});

//move selected item up
$(document).bind('keydown', 'ctrl+8', function(event){
	  event.preventDefault();
	  $(".selected").prev().insertAfter($(".selected"));
});

//move selected item down
$(document).bind('keydown', 'ctrl+9', function(event){
	  event.preventDefault();
	  $(".selected").insertAfter($(".selected").next());
});
