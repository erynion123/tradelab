b2bDb.controller('LoginController', [
    '$rootScope',
    '$scope',
    '$location',
    '$localStorage',
    '$state',
    'Auth',
    function ($rootScope, $scope, $location, $localStorage, $state, auth) 
    {

        $scope.signin = function (user) {
            var isLoginValid = auth.signin(user);
            if(isLoginValid){
                $state.go('adminDashBoard');
            }else{
                $scope.loginError = {
                    type: 'danger',
                    msg: 'Wrong Email or password'
                }
            }
        };
        if($localStorage.user){
            $scope.signin($localStorage.user);
        }

        $scope.logout = function () {
            auth.logout().then(function (data) {
                $location.path('/');
            });
        };

        // Close Alert
        $scope.closeAlert = function(id) {
            $scope.loginError = null;
        };
    }
]);