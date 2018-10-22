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
    sessionStorage.queryPart1 += " UNION { ?movie ex:has_genre ex:Horror }" 
  }
  else if(answer == 'Boy/Girl -friend') {
    sessionStorage.queryPart1 += " UNION { ?movie ex:has_genre ex:Horror } UNION { ?movie ex:has_genre ex:Drama }"
  }
  else if(answer == 'Me Myself and I') {
    sessionStorage.queryPart1 += " ?movie ex:has_genre ?genre . FILTER ( ?genre != ex:Horror )"
  }
}
