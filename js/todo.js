//define actions
var remYourStuff = (function($){
	"use strict";
	var
	undo_item = null,
	
	newItem = function(){
		$('#enter-new').removeClass('editor');
  		$('#textfield').focus();
	},
	
	selectNext = function(){
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
	},
	
	selectPrev = function(){
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
	},
	
	moveUp = function(){
		$(".selected").prev().insertAfter($(".selected"));
	},
	
	moveDown = function(){
		$(".selected").insertAfter($(".selected").next());
	},
	
	deleteItem = function(){
		undo_item = $(".selected");
    	$('li').removeAttr('data-undo-anchor');
    	$('li').removeAttr('data-undo-after');
    	if($("li:last").hasClass('selected')){
      		$(".selected").prev().attr('data-undo-anchor', 'here');
      		$(".selected").prev().attr('data-undo-after', 'true');
    	} else{
      		$(".selected").next().attr('data-undo-anchor', 'here');
    	}
    	$(".selected").remove();
    	$('ul').find("[data-undo-anchor='here']").addClass('selected');
	},
	
	markAsDone = function(){
		$(".selected").toggleClass('strikethrough');
	},
	
	undo = function(){
		if(undo_item !== null){
      		$(".selected").removeClass('selected');
      		if($('ul').find("[data-undo-after='true']").length){
        		undo_item.insertAfter($('li:last'));
      		} else{
        		undo_item.insertBefore($('ul').find("[data-undo-anchor='here']"));
      		}
      		undo_item = null;
    	}
	};
	
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
		
	return {
		newItem: 	newItem,
		selectNext: selectNext,
		selectPrev: selectPrev,
		moveUp: 	moveUp,
		moveDown: 	moveDown,
		deleteItem: deleteItem,
		markAsDone: markAsDone,
		undo: 		undo	  
	}
}(jQuery));

//bind keys to actions
// Neues Item anlegen
$(document).bind('keydown', 'ctrl+a', function(event){
  event.preventDefault(); //verhindert das default Verhalten des Browsers wie Tabwechsel
  remYourStuff.newItem();
});

// select next item
$(document).bind('keydown', 'ctrl+5', function(event){
	event.preventDefault();
	remYourStuff.selectNext();
});

// select prev item
$(document).bind('keydown', 'ctrl+4', function(event){
	event.preventDefault();
	remYourStuff.selectPrev();  
});

// delete selected item
$(document).bind('keydown', 'ctrl+6', function(event){
    event.preventDefault();
    remYourStuff.deleteItem();
});

//undo last deletion
$(document).bind('keydown', 'ctrl+0', function(event){
    event.preventDefault();
    remYourStuff.undo();
});

// mark selected item as done
$(document).bind('keydown', 'ctrl+7', function(event){
  	event.preventDefault();
  	remYourStuff.markAsDone();
});

//move selected item up
$(document).bind('keydown', 'ctrl+8', function(event){
	event.preventDefault();
	remYourStuff.moveUp();
});

//move selected item down
$(document).bind('keydown', 'ctrl+9', function(event){
	event.preventDefault();
	remYourStuff.moveDown();
});

// // Erstes Item löschen
// $(document).bind('keydown', 'ctrl+1', function(event){
// 	  event.preventDefault();
//       $("li:first").remove();
// });

// // Letztes Item löschen
// $(document).bind('keydown', 'ctrl+2', function(event){
// 	  event.preventDefault();
//       $("li:last").remove();
// });

// // Erstes Item erledigt
// $(document).bind('keydown', 'alt+1', function(event){
// 	  event.preventDefault();
//       $("li:first").toggleClass('strikethrough');
// });

// // select first item
// $(document).bind('keydown', 'ctrl+3', function(event){
// 	  event.preventDefault();
//       $(".selected").removeClass('selected');
//       $("li:first").addClass('selected');
// });

//speech API
if (!('webkitSpeechRecognition' in window)) {
	alert('Your Browser doesn\'t support speech recognition.\nChrome 25+ does.');
} else {
	var recognition = new webkitSpeechRecognition();
	var recognizing = false;
	var final_transcript = '';
	var dictNewItem = false;
	
	var lookfor = function(stack, needle){
		var l = needle.length, i, prevIndex = -1, tempIndex, contains = false;
		for(i = 0; i < l; i += 1){
			tempIndex = stack.indexOf(needle[i]); //get the position of a word
			if(tempIndex === -1){ //if a word isn't there break;
				break;
			}
			if(tempIndex > prevIndex){ //words have to be in order
				contains = true;
				prevIndex = tempIndex;
			}
		}
		return contains;
	};
	
	var first_char = /\S/;
	var capitalize = function(s) {
	  	return s.replace(first_char, function(m) { return m.toUpperCase(); });
	}
	
  	recognition.continuous = true;
  	recognition.interimResults = true;
  	recognition.lang = "en";
  	
  	recognition.onstart = function() {
    	recognizing = true;
  	};
  	
  	recognition.onerror = function(event) {
	    if (event.error == 'no-speech') {
	    }
	    if (event.error == 'audio-capture') {
	    	alert('Well you need a microphone to speak with your computer.');
	    }
	    if (event.error == 'not-allowed') {
		    /*if (event.timeStamp - start_timestamp < 100) {
		    } else {
		    } */
		    alert('Please allow your computer to listen to you');
	    }
  	};
  	
  	recognition.onend = function() {
	    recognizing = false;
  	};
  	
  	recognition.onresult = function(event) {
	    var words = [], final_transcript = '', interim_transcript = '', interim_words = '';
	    if (typeof(event.results) == 'undefined') {
	      	recognition.onend = null;
	      	recognition.stop();
	      	return;
	    }
	    for (var i = event.resultIndex; i < event.results.length; ++i) {
	    	if(dictNewItem){
	    		if (event.results[i].isFinal) { //just use strings for new items
		        	final_transcript += event.results[i][0].transcript;
		      	} else {
		        	interim_transcript += event.results[i][0].transcript;
		      	}
	    	}
	      	else{
	      		if (event.results[i].isFinal) {
	    			words = words.concat( event.results[i][0].transcript.trim().split(" ") );
	    		}
	    		else{
	    			interim_words += event.results[i][0].transcript+" -- "+event.results[i][0].confidence+"\n";
	    		}
	      	}
	    }
	    if(dictNewItem){
	    	$('#textfield').val(interim_transcript);
	    	console.log(interim_transcript);
	    	
	    	if(final_transcript !== ''){ //transcript is only marked as final after pause, so we can use it as a signal of a pause...
	    		$('#textfield').val(final_transcript);
	    		$('form').submit();
	    		dictNewItem = false;
	    		console.log(final_transcript);
	    	}
	    }
	    else if(words.length > 0){
	    	if(lookfor(words, ["new", "item"]) || lookfor(words, ["create", "item"])){
	    		remYourStuff.newItem();
	    		dictNewItem = true;
	    	}
	    	else if(lookfor(words, ["next"])){
	    		remYourStuff.selectNext();
	    	}
	    	else if(lookfor(words, ["previous"])){
	    		remYourStuff.selectPrev();
	    	}
	    	else if(lookfor(words, ["up"])){
	    		remYourStuff.moveUp();
	    	}
	    	else if(lookfor(words, ["down"])){
	    		remYourStuff.moveDown();
	    	}
	    	else if(lookfor(words, ["done"])){
	    		remYourStuff.markAsDone();
	    	}
	    	else if(lookfor(words, ["delete"]) || lookfor(words, ["remove"])){
	    		remYourStuff.deleteItem();
	    	}
	    	else if(lookfor(words, ["undo"])){
	    		remYourStuff.undo();
	    	}
	    	console.log("words: "+words);
	    } else {
	    	console.log(interim_words); //just show uncertain words and probability in console
	    }
  	};
  	
  	recognition.start();
}