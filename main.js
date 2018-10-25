angular.module('KRRclass', [ 'chart.js']).controller('MainCtrl', ['$scope','$http', mainCtrl]);


function mainCtrl($scope, $http, ChartJsProvider){
  	
	 
	
	// ###################### Question 4 
	// Associate your sparql endpoint to a scope variable. Add the "/query?query=" parameter after the variable
	// Ex. $scope.myVariable = "myendpoint"
	$scope.mysparqlendpoint = "http://localhost:5820/FinalProjectKD/query?query=";
	


	// ###################### Question 6 	
	// Create an interaction with the triplestore by filling the following method 
	// The function needs to include : some arguments sent by the html + an http call to the sparql endpoint + a variable storing the results to be visualised    
	// use the native function encodeURI(mySparqlQuery) to encode your query as a URL
	$scope.fireInteraction = function(){
		$http( {
 			method: "GET",
			url : $scope.myQuery = $scope.mysparqlendpoint+encodeURI(sessionStorage.query).replace(/#/g, '%23'),
			headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
			} )
			.success(function(data, status ) {
          $scope.result = data;
          // // Use the console to see how your response looks like
// console.log(data);
$scope.myDynamicLabels = [];
$scope.myDynamicData = [];
				  
 // now iterate on the results
angular.forEach(data.results.bindings, function(val) {
	$scope.myDynamicLabels.push(val.movie.value);
	$scope.myDynamicData.push(val.rating.value);
});
movie1 = $scope.myDynamicLabels[0]
movie1 = movie1.split('/')
movie1 = movie1[movie1.length-1]
console.log(movie1)
omdb(movie1)

movie2 = $scope.myDynamicLabels[1]
movie2 = movie2.split('/')
movie2 = movie2[movie2.length-1]
console.log(movie2)
omdb(movie2)

movie3 = $scope.myDynamicLabels[2]
movie3 = movie3.split('/')
movie3 = movie3[movie3.length-1]
console.log(movie3)

omdb(movie3)

movie4 = $scope.myDynamicLabels[3]
movie4 = movie4.split('/')
movie4 = movie4[movie4.length-1]
console.log(movie4)

omdb(movie4)

movie5 = $scope.myDynamicLabels[4]
movie5 = movie5.split('/')
movie5 = movie5[movie5.length-1]
console.log(movie5)
omdb(movie5)
  		})
			.error(function(error ){
	    		console.log('Error '+error);
			});
	};

}

function omdb(title) {
  $.get("http://www.omdbapi.com/?t=" + title + "&apikey=db177536", function(data, status){
      if (data.Response == "False"){
      }

      else{
        var movieTitle = data.Title
        var movieGenre = "<br>Genres: " + data.Genre
        var movieActors = "<br>Actors: " + data.Actors
        var movieDirector = "<br>Director: " + data.Director
        var movieWriter = "<br>Writer: " + data.Writer
        var movieRuntime = "<br>Runtime: " + data.Runtime
        var movieAwards = "<br>Awards: " + data.Awards
        var movieReleased = "<br>Release data: " + data.Released
        var movieWebsite = "<br>Website: <a href=\"" + data.Website + "\">link <i class=\"fas fa-link\" style=\"font-size:11px;\"></i> </a>" 
        var moviePlot = "<br>Plot: " + data.Plot
        var image = document.createElement("img");
        var poster = image.src=data.Poster
        var actorList = data.Actors.split(',');
        var i;
        for (i=0; i < actorList.length; i++) {
          actorList = actorList.map(function (el) {
            return el.trim();
          });
          var url = "http://dbpedia.org/sparql"; 
          var actorName = actorList[i].split(' ').join('_');
          var query = "PREFIX dbpedia2: <http://dbpedia.org/resource/> PREFIX Abs: <http://dbpedia.org/ontology/> SELECT ?about WHERE { dbr:"+actorName+" dbo:abstract ?about FILTER (lang(?about) = 'en')}"
          var queryUrl = encodeURI( url+"?query="+query+"&format=json" );
          $.ajax({
              dataType: "jsonp",  
              url: queryUrl,
              success: function( _data ) {
                  var results = _data.results.bindings;
                  for ( var i in results ) {
                      var res = results[i].about.value;
                      console.log(res);
                  }
              }
          });
        }
        if (movieWebsite.indexOf('http://') >= 0) {
          document.getElementById("omdb").innerHTML += "<div class=\"movieResultWrapper animated slideInUp\"><div class=\"movieInformation\">" + "<span class=\"movieTitle\">" + movieTitle + "</span>" + movieGenre + movieActors + movieDirector +  movieWriter + movieRuntime + movieAwards + movieReleased + "<span id=\"websiteTag\">" + movieWebsite + "</span>" + moviePlot + "</div><img src=\""+ poster + "\"></div>"
        }
        else {
          document.getElementById("omdb").innerHTML += "<div class=\"movieResultWrapper animated slideInUp\"><div class=\"movieInformation\">" + "<span class=\"movieTitle\">" + movieTitle + "</span>" + movieGenre + movieActors + movieDirector +  movieWriter + movieRuntime + movieAwards + movieReleased + moviePlot + "</div><img src=\""+ poster + "\"></div>"
        }  
      }
      
    });
  }

function setAnswer(answer) {
  if(answer == 'Happy') {
    sessionStorage.queryPart1 = "PREFIX ex: <http://example.com/movieont/> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX xml: <http://www.w3.org/XML/1998/namespace> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT DISTINCT?movie ?rating WHERE { ?movie ex:has_movieId ?id . OPTIONAL { ?movie ex:has_genre ex:Animation } ?id ex:has_rating ?rating . ?movie ex:has_year ?year . FILTER ( ?year > 2000 ) {?movie ex:has_genre ex:Comedy } UNION {?movie ex:has_genre ex:Fantasy} UNION {?movie ex:has_genre ex:Sci-Fi .}"
  }
  else if(answer == 'Stressed') {
    sessionStorage.queryPart1 = "PREFIX ex: <http://example.com/movieont/> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX xml: <http://www.w3.org/XML/1998/namespace> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT DISTINCT?movie ?rating WHERE { ?movie ex:has_movieId ?id . ?id ex:has_rating ?rating . ?movie ex:has_year ?year . FILTER ( ?year > 2000 ) {?movie ex:has_genre ex:Comedy } UNION {?movie ex:has_genre ex:Fantasy}"
  }
  else if(answer == 'Bored') {
    sessionStorage.queryPart1 = "PREFIX ex: <http://example.com/movieont/> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX xml: <http://www.w3.org/XML/1998/namespace> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT DISTINCT?movie ?rating WHERE { ?movie ex:has_movieId ?id . ?id ex:has_rating ?rating . ?movie ex:has_year ?year . FILTER ( ?year > 2000 ) {?movie ex:has_genre ex:Action } UNION {?movie ex:has_genre ex:Adventure} {?movie ex:has_genre ex:Crime } UNION {?movie ex:has_genre ex:Drama}"
  }
  else if(answer == 'Excited') {
    sessionStorage.queryPart1 = "PREFIX ex: <http://example.com/movieont/> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX xml: <http://www.w3.org/XML/1998/namespace> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT DISTINCT?movie ?rating WHERE { ?movie ex:has_movieId ?id . ?id ex:has_rating ?rating . ?movie ex:has_year ?year . FILTER ( ?year > 2000 ) {?movie ex:has_genre ex:Action } UNION {?movie ex:has_genre ex:Adventure} {?movie ex:has_genre ex:Crime } UNION {?movie ex:has_genre ex:Fantasy}"
  }
  else if(answer == 'Angry') {
    sessionStorage.queryPart1 = "PREFIX ex: <http://example.com/movieont/> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX xml: <http://www.w3.org/XML/1998/namespace> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT DISTINCT?movie ?rating WHERE { ?movie ex:has_movieId ?id . ?id ex:has_rating ?rating . ?movie ex:has_year ?year . FILTER ( ?year > 2000 ) {?movie ex:has_genre ex:Comedy } UNION {?movie ex:has_genre ex:Fantasy}"
  }
  else if(answer == 'Empty') {
    sessionStorage.queryPart1 = "PREFIX ex: <http://example.com/movieont/> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX xml: <http://www.w3.org/XML/1998/namespace> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT DISTINCT?movie ?rating WHERE { ?movie ex:has_movieId ?id . ?id ex:has_rating ?rating ."
  }
  else if(answer == 'Friends') {
    sessionStorage.queryPart2 = " UNION { ?movie ex:has_genre ex:Horror }" 
  }
  else if(answer == 'Boy/Girl -friend') {
    sessionStorage.queryPart2 = " UNION { ?movie ex:has_genre ex:Horror } UNION { ?movie ex:has_genre ex:Drama }"
  }
  else if(answer == 'Me Myself and I') {
    sessionStorage.queryPart2 = " ?movie ex:has_genre ?genre . FILTER ( ?genre != ex:Horror )"
  }
}

function ageChecker() {
  if (parseInt(document.getElementById("ageSlider").value) < 10) {
    sessionStorage.queryPart3 = " ?movie ex:has_genre ex:Children ."
  }
  else {
    sessionStorage.queryPart3 = ""
  }

}

function addActorQuery(){
  for (i in sessionStorage.Actorlist){
    alert(i)
    sessionStorage.queryPart5 = "?movie dbo:starring dbr" + i
    console.log(sessionStorage.queryPart5)
  }
}

function mergeQuery() {
  if (typeof sessionStorage.queryPart2 == 'undefined') {
    sessionStorage.queryPart2 = ""
  }
  sessionStorage.queryPart4 = "} ORDER BY DESC(?rating) LIMIT 100"
  sessionStorage.query = sessionStorage.queryPart1 + sessionStorage.queryPart2 + sessionStorage.queryPart3 + sessionStorage.queryPart4

}
function sendQuery() {
  document.getElementById("inputField").value = ""
  document.getElementById("inputButton").click()
}

function resetSession() {
  sessionStorage.query = ""
  sessionStorage.queryPart1 = ""  
  sessionStorage.queryPart2 = ""  
  sessionStorage.queryPart3 = ""  
  sessionStorage.queryPart4 = ""  
}