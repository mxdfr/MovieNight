angular.module('KRRclass', [ 'chart.js']).controller('MainCtrl', ['$scope','$http', mainCtrl]);


function mainCtrl($scope, $http, ChartJsProvider){
  	
	 
	
	// ###################### Question 4 
	// Associate your sparql endpoint to a scope variable. Add the "/query?query=" parameter after the variable
	// Ex. $scope.myVariable = "myendpoint"
	$scope.myendpoint = 'http://localhost:5820/Mapping/query?query=';
	
	
	// ###################### Question 5 
	// Create 2 different data visualisations based on two SPARQL queries
	// For each of the visualisation: 
	// (1) Run the SPARQL query on the console 
	// (2) Copy the SPARQL results a scope variable, ex. $scope.myresult = [] 
	// (3) Associate the SPARQL query to another scope variable, ex. $scope.myquery = "myquery"
	// Examples :
	// ex1 : a piechart of the most frequent classes, 
	// ex2 : a barplot of the most frequent properties
	$scope.myInstances = [1, 7, 1, 1, 2, 2, 1, 2, 11, 6, 1, 47, 1, 1, 1, 5, 2, 1, 47, 28];
	$scope.myClasses = ["owl:Ontology","owl:ObjectProperty", "owl:SymmetricProperty","owl:TransitiveProperty", "owl:AsymmetricProperty", "owl:IrreflexiveProperty", "owl:FunctionalProperty", "ed:ConnectionDevices", "owl:Class", "owl:Restriction", "ed:Features", "owl:Thing", "ed:OperatingSystems", "ed:SmartHomeDevices", "ed:SmartThermostats", "ed:SmartphoneFeatures", "ed:Smartphones", "ed:ThermostatFeatures", "owl:NamedIndividual", "s:Smartphone"];



	$scope.visualisationData1 ; 
	$scope.sparqlquery1 = "SELECT ?class (COUNT(?s) AS ?c) WHERE { ?s a ?class } GROUP BY ?class"
	
	$scope.myInstances2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	$scope.myClasses2 = ["ed:OnePlus_6"," dbr:Android_One", "dbr:Blackphone","dbr:Cherry_Mobile_Flare", "dbr:Google_Nexus", "dbr:HTC_Excalibur", "dbr:HTC_Salsa", "dbr:HTC_Sonata", "dbr:HTC_Tornado", "dbr:HTC_Touch_Cruise", "dbr:Huawei_Ascend", "dbr:Huawei_Honor", "dbr:IPhone", "dbr:LG_GW620", "dbr:Motorola_Milestone_XT720", "dbr:Neo_1973", "dbr:Neo_FreeRunner", "dbr:Nokia_N90 ", "dbr:Samsung_Galaxy", "dbr:Samsung_Gear_VR", "dbr:Toshiba_g500", "dbr:Treo_180", "dbr:Treo_180g", "dbr:Treo_270", "dbr:Treo_650", "dbr:Treo_700w", "dbr:Treo_700wx", "dbr:Treo_750", "dbr:Treo_755p" ];
																																																																																																				
	$scope.visualisationData2 ;
	$scope.sparqlquery2 = "SELECT ?smartphones (COUNT(?smartphones) AS ?phones) WHERE { ?smartphones rdf:type s:Smartphone.} GROUP BY ?smartphones";
	
	
	// use a third variable if you want to visualise labels   
	$scope.visualisationLabels1 ;
	$scope.visualisationLabels2 ;


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


