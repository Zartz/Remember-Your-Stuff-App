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