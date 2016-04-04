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


.controller('MainCtrl', function($scope, Survey, $state, $localstorage) {

	$scope.$root.pass_code = "";

	$scope.getSurvey = function(){

    $scope.idsReset();


    $localstorage.set("pass_code", $scope.$root.pass_code); 


		var data = Survey.getData($scope.$root.pass_code, function(data){
  			$scope.$root.survey = data;
  			if ($scope.$root.survey.state === "1") {
  				$scope.loginMessage = "Hatalı giriş kodu kullandınız !";
  			}
  			else if ($scope.$root.survey.state === "2") {
  				$scope.loginMessage = "Bu giriş kodu daha önce kullanılmış !";
  			}
  			else if ($scope.$root.survey.state === "3") {
  				$scope.loginMessage = "Bu test daha başlamadı !";
  			}
  			else if ($scope.$root.survey.state === "4") {
  				$scope.loginMessage = "Bu testin süresi geçmiş !";
  			}
  			else {
  				$state.go("app.survey_entrance");
          $scope.loginMessage = "";
  			}
  			
  		}, function(data2){
        if ($scope.$root.survey  === undefined) {
          $scope.$root.loginMessage = "Bağlantı hatası !";
        }

      });

	}
	
})

.controller('SurveyCtrl', function($scope, $localstorage, Survey, $state) {

    $scope.postSurvey = function(){

      var data = Survey.postData($scope.ids_array, $localstorage.get('pass_code'), function(data){
        $scope.$root.result = data.state;
      });
      $scope.$root.pass_code = "";
      $scope.idler="";
      $state.go('app.main');


    }


    $scope.ids_synchro = function() {
      $scope.idler = $localstorage.getObject('idler') || {};
      $scope.ids_array = [];
      angular.forEach($scope.idler, function(value, key) {
        this.push(parseInt(key));
      }, $scope.ids_array);
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
      $scope.ids_array = [];
      angular.forEach($scope.idler, function(value, key) {
        this.push(parseInt(key));
      }, $scope.ids_array);
    };


  $scope.cardClass = function(id){
      if ($scope.idler[id] === true) {
        return "clickedAnswer"
      }
      else {
        return ""
      }
    };

    $scope.currentPage = 0;
    
    $scope.question_size = $scope.$root.survey[1].length-1;
    $scope.loadNextPage = function() {
      $scope.currentPage++;
    }
    $scope.loadPrevPage = function() {
      $scope.currentPage--;
    }

})

.controller('SurveyEntranceCtrl', function($scope) {






})

.controller('AboutCtrl', function($scope) {

})
