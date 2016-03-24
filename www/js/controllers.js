angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

})


.controller('MainCtrl', function($scope, Survey, $state) {

	$scope.$root.pass_code = "";

	$scope.getSurvey = function(){


		var data = Survey.getData($scope.$root.pass_code, function(data){
  			$scope.$root.survey = data;
  			if ($scope.$root.survey.state === "1") {
  				$scope.$root.loginMessage = "Hatalı giriş kodu kullandınız !";
  			}
  			else if ($scope.$root.survey.state === "2") {
  				$scope.$root.loginMessage = "Bu giriş kodu daha önce kullanılmış !";
  			}
  			else if ($scope.$root.survey.state === "3") {
  				$scope.$root.loginMessage = "Bu test daha başlamadı !";
  			}
  			else if ($scope.$root.survey.state === "4") {
  				$scope.$root.loginMessage = "Bu testin süresi geçmiş !";
  			}
  			else {
  				$state.go("app.survey_entrance");
  			}
  			
  		});



	}
	
})

.controller('SurveyCtrl', function($scope, $sce) {

	$scope.renderHtml = function(html_code)
    {
      return $sce.trustAsHtml(html_code);
    };


})

.controller('SurveyEntranceCtrl', function($scope, $sce) {

	$scope.renderHtml = function(html_code)
    {
      return $sce.trustAsHtml(html_code);
    };


})

.controller('AboutCtrl', function($scope) {

})
