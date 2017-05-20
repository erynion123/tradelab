b2bDb.controller('AppController',[
    '$scope',
    '$rootScope',
    '$http',
    '$location',
    '$localStorage',
    'Auth',
    function($scope, $rootScope, $http, $location, $localStorage, auth)
    {

        $scope.logout = function () {
            auth.logout();
        };


        // Handler for messages coming from the service worker
        if('serviceWorker' in navigator){
            navigator.serviceWorker.addEventListener('message', function(event){
                console.log('broarcasting:', event.data.tag);
                $rootScope.$broadcast(event.data.tag);
            });
        }

    }
]);
