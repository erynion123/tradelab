b2bDb.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider)
    {
        $urlRouterProvider.otherwise("/login");
        $locationProvider.html5Mode(true);

        $stateProvider

        .state('login', {
            url: "/login",
            templateUrl: "templates/common/login.html",
            controller: "LoginController",
            data: { pageTitle: 'Login' }
        })


        .state('404', {
            url: "/404",
            templateUrl: "templates/common/404.html",
            data: { pageTitle: '404' }
        })


        .state('adminDashBoard', {
            url: "/admin",
            controller: "AdminDashboardController",
            templateUrl: 'templates/admin/adminDashboard.html',
            data: { pageTitle: 'Home' }
        })
        .state('adminDashBoard.homepage', {
            url: "/home",
            templateUrl: 'templates/admin/home.html',
            data: { pageTitle: 'Home' }
        })


    }
]);


