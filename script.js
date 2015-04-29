var apikey = 'fbf1f9033c363564ebbbfddfee9708bc18e08cb0'; // Put your API key here
var game;
var i = 0;
var resultsGame = [];
// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
 
 
    for(i = 0; i <= 7; i++){
    	$("#wait").empty();
    	var picture = results[i].image.medium_url;
    	var deck = results[i].deck;
    	var game = results[i].site_detail_url;
    	resultsGame.push(results[i]);
    	display(results[i]);
	}
	console.log(resultsGame);
}

function display(array){

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
