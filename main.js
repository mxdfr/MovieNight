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
			url : $scope.myQuery = $scope.mysparqlendpoint+encodeURI($scope.myInput).replace(/#/g, '%23'),
			headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
			} )
			.success(function(data, status ) {
          $scope.result = data;
          console.log(data)
          // // Use the console to see how your response looks like
// console.log(data);
$scope.myDynamicLabels = [];
$scope.myDynamicData = [];
				  
 // now iterate on the results
angular.forEach(data.results.bindings, function(val) {
	$scope.myDynamicLabels.push(val.movie.value);
	$scope.myDynamicData.push(val.rating.value);
});
console.log($scope.myDynamicLabels[0])
movie1 = $scope.myDynamicLabels[0]
movie1 = movie1.split('/')
movie1 = movie1[movie1.length-1]
movie2 = $scope.myDynamicLabels[1]
movie2 = movie2.split('/')
movie2 = movie2[movie2.length-1]
movie3 = $scope.myDynamicLabels[2]
movie3 = movie3.split('/')
movie3 = movie3[movie3.length-1]
$("#movie1").html(movie1);
$("#rating").html($scope.myDynamicData[0]);
$("#movie2").html(movie2);
$("#rating2").html($scope.myDynamicData[1]);
$("#movie3").html(movie3);
$("#rating3").html($scope.myDynamicData[2]);
  		})
			.error(function(error ){
	    		console.log('Error '+error);
			});
	};

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
    sessionStorage.queryPart1 = "PREFIX ex: <http://example.com/movieont/> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX xml: <http://www.w3.org/XML/1998/namespace> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT DISTINCT?movie ?rating WHERE {"
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
function mergeQuery() {
  sessionStorage.queryPart4 = "} ORDER BY DESC(?rating) LIMIT 100"
  sessionStorage.query = sessionStorage.queryPart1 + sessionStorage.queryPart2 + sessionStorage.queryPart3 + sessionStorage.queryPart4
  alert(sessionStorage.query)
}