var apikey = 'fbf1f9033c363564ebbbfddfee9708bc18e08cb0'; // Put your API key here
var game;
var i = 0;
var resultsGame = [];
var currentPos = 0;
var currentChild;
// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
 
 
    for(i = 0; i <= 7; i++){
    	$("#wait").empty();
    	var picture = results[i].image.medium_url;
    	var deck = results[i].deck;
    	var game = results[i].site_detail_url;
    	resultsGame.push(results[i]);
    	// display(results[i]);
    	    	$(".middle").append("<div class='hidden container well col-md-4 col-xs-12' id='mainWindow'><div class='hidden-sm hidden-xs' id='gameImage'><img src='" + picture + "'/></div><div class='outer' id='gameTitle'><p class='lead text-center'>" + results[i].name + "</p></div><p id='textHidden'>" + results[i].deck + "<br><a href='" + game + "' target='_blank'>Take me there</a></p><button class='btn-sm btn-primary' id='removeGame'>Remove Game</button></div>");
	}
	console.log($(".middle").children().first());
	display();
}

function display(){
	currentChild = $(".middle").children().first();
	currentChild.removeClass("hidden");
}


function right(){
	currentChild.addClass("hidden");
	if(currentPos == 7){
		currentChild = $(".middle").children().first();
		currentPos = 0;
	} else {
	currentChild = currentChild.next();
}
	currentChild.removeClass("hidden");
	currentPos++;
}
function left(){
	currentChild.addClass("hidden");
	if(currentPos == 0){
		currentChild = $(".middle").children().last();
		currentPos = 7;
	} else {
	currentChild = currentChild.prev();
}
	currentChild.removeClass("hidden");
	currentPos--;
}


$(document).ready(function() {
	$(".searchBtn").on("click", function(){
		event.preventDefault();
		game = $("#searchField").val();
		search(game);
		$("#searchBox").append("<p id='wait'>Please wait.....</p>");
		
	});
	$(".clearList").on("click", function(){
		$("#returnGame").fadeOut();

	});
	$("#returnGame").on("click", "#removeGame", function(){
		$(this).parent().fadeOut();
	});
	$(".pull2").on("click", function(){
		right();
	});
	$(".pull1").on("click", function(){
		left();
	});
	


	// Start the search here!
	
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
