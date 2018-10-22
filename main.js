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
