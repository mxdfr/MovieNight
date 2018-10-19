angular.module('KRRclass', [ 'chart.js']).controller('MainCtrl', ['$scope','$http', mainCtrl]);


function mainCtrl($scope, $http, ChartJsProvider){
  	
	 
	
	// ###################### Question 4 
	// Associate your sparql endpoint to a scope variable. Add the "/query?query=" parameter after the variable
	// Ex. $scope.myVariable = "myendpoint"
	$scope.var = 'NIGHT';
	


	// ###################### Question 6 	
	// Create an interaction with the triplestore by filling the following method 
	// The function needs to include : some arguments sent by the html + an http call to the sparql endpoint + a variable storing the results to be visualised    
	// use the native function encodeURI(mySparqlQuery) to encode your query as a URL
	$scope.doMyAction = function(){
        $scope.dynamicQuery = "Select ?s where { ?s a <http://data.vu.nl/coda/ontology/class#"+$scope.myInput+"> } limit 5";
        //$scope.dynamicQuery = $scope.myInput;
        console.log($scope.myendpoint+encodeURI($scope.myInput).replace(/#/g, '%23'));
        $http( {
        method: "GET",
        headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'},
        url : $scope.myendpoint+encodeURI($scope.myInput).replace(/#/g, '%23'),

    } )
    .success(function(data, status ) {

        console.log(data);
        $scope.result=data;
    })
    .error(function(error ){
        console.log('Error');
    });
		
	};
	
	

}
