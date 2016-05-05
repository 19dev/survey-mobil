angular.module('starter', ['ionic', 'starter.controllers', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})

.factory("Survey", function($http) {
    var surveyUrl = "https://anketsistemi.herokuapp.com/surveyMobile?passcod=";
    var recordUrl = "https://anketsistemi.herokuapp.com/recordMobile";

    return {
      getData: function(code, success, error) {
          $http({
                url: surveyUrl + code,
                method: "GET"
            }).success(function(data) {
                    success(data);
              })
              .error(function(data) {
                    error(data);
              });
      },

      postData: function(ids, code, success) {
          $http({
                url: recordUrl + "?idler=" + ids + "&passcod=" + code,
                method: "GET"
            }).success(function(data) {
                    success(data);
              });
        }
    }


})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.main', {
      url: '/main',
      views: {
        'menuContent': {
          templateUrl: 'templates/main.html',
          controller: 'MainCtrl'
        }
      }
    })

    .state('app.survey', {
      url: '/survey',
      views: {
        'menuContent': {
          templateUrl: 'templates/survey.html',
          controller: 'SurveyCtrl'
        }
      }
    })

    .state('app.survey_entrance', {
      url: '/survey_entrance',
      views: {
        'menuContent': {
          templateUrl: 'templates/survey_entrance.html',
          controller: 'SurveyEntranceCtrl'
        }
      }
    })

    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html',
          controller: 'AboutCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
});
