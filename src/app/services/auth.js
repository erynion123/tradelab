b2bDb.service('Auth',[
    '$http',
    '$localStorage',
    '$state',
    '$q',
    '$location',
    function ($http, $localStorage,$state,$q,$location) {


        this.signin = function (data) {
            if(data.email === 'akash.babber@gmail.com' && data.password === '1234'){
                $localStorage.user = data;
                return true;
            }
        };

        this.logout = function () {
            delete $localStorage.user;
            $location.path('/');
        };

    }
]);