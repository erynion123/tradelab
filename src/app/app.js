
var b2bDb = angular.module("b2bDb", [
    "ui.router",
    "ui.bootstrap",
    "ui.bootstrap.tpls",
    "oc.lazyLoad",
    'ngStorage',
    "ngSanitize",
    "ngAnimate",
    'angularUtils.directives.dirPagination',
    'frapontillo.bootstrap-switch',
    'ngTagsInput',
    'xeditable',
    'ui.select',
    'angular.filter',
    'angularMoment'
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
b2bDb.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug:false
    });
}]);

b2bDb.factory('settings', ['$rootScope', function ($rootScope) {
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 200 // auto scroll to top on page load
        }
    };

    $rootScope.settings = settings;
    return settings;
}]);



/* Setup App Main Controller */
b2bDb.controller('AppController', [
    '$scope',
    function ($scope)
    {

        $scope.$on('$viewContentLoaded', function () {
            Metronic.initComponents(); // init core components
            Metronic.init();
            FormValidation.init();
            ComponentsFormTools.init();
            ComponentsPickers.init();
        });

    }
]);

/***
 Layout Partials.
 By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
 initialization can be disabled and Layout.init() should be called on page load complete as explained above.
 ***/

/* Setup Layout Part - Header */
b2bDb.controller('HeaderController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initHeader(); // init header
    });
}]);



/* Setup Layout Part - Footer */
b2bDb.controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer
    });
}]);


/* Init global settings and run the app */
b2bDb.run([
    '$rootScope',
    'settings',
    '$state',
    '$http',
    '$localStorage',
    'Auth',
    '$location',
    'editableOptions',
    function ($rootScope, settings, $state, $http, $localStorage, auth, $location, editableOptions)
    {
        $rootScope.$state = $state; // state to be accessed from view
        editableOptions.theme = 'bs3'; // bootstrap3 theme for editable

        var autoLogin = function(){
            if($localStorage.token == null){
                $location.path('/login');
            }
        };
        autoLogin();

        $http.get('config/config.json').success(function (response) {
            $rootScope.baseURL = response.baseURL;
            $rootScope.imgURL = response.imgURL;
        }).error(function () {
            console.log('error occured while getting config file');
        });

    }
]);


b2bDb.config(['$httpProvider',function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
