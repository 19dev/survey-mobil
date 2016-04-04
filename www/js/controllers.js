angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $sce, $localstorage) {
    $scope.renderHtml = function(html_code)
    {
      return $sce.trustAsHtml(html_code);
    };

    $scope.idsReset = function(){
      $localstorage.setObject("idler", {});
    };
})


.controller('MainCtrl', function($scope, Survey, $state) {

	$scope.$root.pass_code = "";

	$scope.getSurvey = function(){

    $scope.idsReset();


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

    if ($scope.$root.survey  === undefined) {
          $scope.$root.loginMessage = "Bağlantı hatası !";
        }



	}
	
})

.controller('SurveyCtrl', function($scope, $localstorage) {


    $scope.ids_synchro = function() {
      $scope.idler = $localstorage.getObject('idler') || {};
      $scope.idler_array = [];
      angular.forEach($scope.idler, function(value, key) {
        this.push(parseInt(key));
      }, $scope.idler_array);
    };

    $scope.ids_synchro();


    $scope.ids_import_export = function(id){
      if ($scope.idler[id] !== true) {
        $scope.idler[id] = true;
        $localstorage.setObject("idler", $scope.idler);
      }
      else {
        delete $scope.idler[id];
        $localstorage.setObject("idler", $scope.idler);
      }
      $scope.idler_array = [];
      angular.forEach($scope.idler, function(value, key) {
        this.push(parseInt(key));
      }, $scope.idler_array);
    };


  $scope.cardClass = function(id){
      if ($scope.idler[id] === true) {
        return "clickedAnswer"
      }
      else {
        return ""
      }
    };


})

.controller('SurveyEntranceCtrl', function($scope) {






})

.controller('AboutCtrl', function($scope) {

})
