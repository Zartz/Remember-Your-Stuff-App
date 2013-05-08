$('form').submit(function(){
  if ($('input').val() !== '' ) {
    var input_value = $('input').val();
	var newElement = '<li>' + input_value  + '</li>'
    $('ul').append(newElement);
	$('li:last').focus();
	$('li:last').addClass("li-change"); 
	
  };

  $('input').val(''); // Text weg
  $('#enter-new').addClass('editor');
  $('#textfield').blur();
  return false; 
});

