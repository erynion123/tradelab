b2bDb.controller('AdminDashboardController', [
    '$scope',
    '$state',
    'dataFactory',
    '$timeout',
    function ($scope, $state,dataFactory,$timeout)
    {
        $scope.$on('$includeContentLoaded', function () {
            Layout.initSidebar();
        });
        $scope.$on('$viewContentLoaded', function() {
            if($state.current.name==='adminDashBoard'){
            $state.go('adminDashBoard.homepage');
        }});

        $scope.data = dataFactory;

        $scope.userInstruments = [];


        $scope.addInstrument = function (item) {
            if($scope.userInstruments.indexOf(item) == -1){
                $scope.userInstruments.push(item);
            }
        };

        $scope.removeInstrument = function (index) {
            $scope.userInstruments.splice(index,1);
        };

            var repeat = function() {
                if($scope.userInstruments.length > 0){
                    for(var i = 0; i < $scope.userInstruments.length; i++){
                        var newAttr = $scope.userInstruments[i].attr;
                        console.log(newAttr);
                    }
                }
            };
        $timeout(repeat(),3000);
    }
]);