angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

})


.controller('MainCtrl', function($scope, Survey) {

	$scope.$root.pass_code = "";

	$scope.getSurvey = function(){


		var data = Survey.getData($scope.$root.pass_code, function(data){
  			$scope.survey = data;
  			console.log(data);
  		});

	}
	
})

.controller('SurveyCtrl', function($scope) {

})

.controller('AboutCtrl', function($scope) {

})
