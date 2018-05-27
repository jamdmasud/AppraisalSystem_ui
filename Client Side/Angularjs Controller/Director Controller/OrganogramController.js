myApp.controller('departmentOrganogramController', ['$scope', 'HOBUdataServices', function ($scope, HOBUdataServices) {


    $scope.GenarateOrganogram = function () {
        $scope.chartData = [['Name', 'ReportsTo', 'tooltip']];

        HOBUdataServices.getOrganogramData().then(function (response) {
            var newobject = [['Name', 'ReportsTo', 'tooltip']];
            angular.forEach(response.data, function (val) {
                newobject.push(
                    [
                        {
                            v: val.employeeName,
                            f: '<div class="customBox"><div>' + (val.employeeName + ' (' + val.employeeId + ')') + '</div><div class="title">' + val.designation + '</div><div class="title">' + val.groupName + '</div></div>'
                        },
                        (val.reportToName),
                        (val.employeeName)
                    ]
                );

            });
            $scope.chartData = newobject;
        })
    }

    $scope.GenarateOrganogram();


}])