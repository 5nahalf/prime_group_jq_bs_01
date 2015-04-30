var apikey = 'fbf1f9033c363564ebbbfddfee9708bc18e08cb0';
var game;
var i = 0;
var currentPos = 0;
var currentChild;
var currentDot;
function searchCallback(results) {
        $(".middle").empty();
		$(".row").empty();
		$(".jack").empty();
    for(i = 0; i <= 7; i++){
    	var picture = results[i].image.medium_url;
    	var deck = results[i].deck;
    	var game = results[i].site_detail_url;
    	    $(".middle").append("<div class='mainWindow hidden container well'><div class='hidden-sm hidden-xs' id='gameImage'><img src='" + picture + "'/></div><div class='outer' id='gameTitle'><p class='lead text-center'>" + results[i].name + "</p></div><p id='textHidden'>" + results[i].deck + "<br><a href='" + game + "' target='_blank'>Take me there</a></p></div>");
	}
	$(".row").append('<div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>');
	display();
}
function display(){
	currentChild = $(".middle").children().first();
	currentChild.removeClass("hidden");
	currentDot = $(".row").children().first();
	currentDot.addClass("rowDot");
}
function right(){
	currentChild.addClass("hidden");
	currentDot.removeClass("rowDot");
	currentPos++;
	if(currentPos == 8){
		currentChild = $(".middle").children().first();
		currentPos = 0;
		currentDot = $(".row").children().first();
	} else {
	currentChild = currentChild.next();
	currentDot = currentDot.next();
}
	currentChild.removeClass("hidden");
	currentDot.addClass("rowDot");
}
function left(){
	currentChild.addClass("hidden");
	currentDot.removeClass("rowDot");
	if(currentPos == 0){
		currentChild = $(".middle").children().last();
		currentPos = 8;
		currentDot = $(".row").children().last();
	} else {
	currentChild = currentChild.prev();
	currentDot = currentDot.prev();
}
	currentChild.removeClass("hidden");
	currentDot.addClass("rowDot");
	currentPos--;
}
$(document).ready(function() {
	$(".searchBtn").on("click", function(){
		$(".jack").empty();
		event.preventDefault();
		game = $("#searchField").val();
		search(game);
		$("#searchBox").append("<div class='jack'><p id='wait'>Please wait.....</p></div>");
	});
	$(".clearList").on("click", function(){
		$(".middle").empty();
		$(".row").empty();	
	});
	$(".pull2").on("click", function(){
		right();
	});
	$(".pull1").on("click", function(){
		left();
	});
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');

	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});
}