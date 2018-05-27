myApp.controller('totalOrganogram', ['$scope', 'HOBUdataServices', 'OtherDataServices', function ($scope, HOBUdataServices, OtherDataServices) {

    $scope.GenarateOrganogram = function (data) {
        $scope.chartData = [['Name', 'ReportsTo', 'tooltip']];

        HOBUdataServices.getTotalOrganogram(data).then(function (response) {
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

    $scope.GetDepartmentList = function () {
        OtherDataServices.getDepartmentList().then(function (response) {
            $scope.DepartmentList = response.data;
        })
    }

    $scope.GetDepartmentList();
    $scope.GenarateOrganogram('');


    $scope.GetDepartmentWiseOrganogram = function (data) {
        var searchData;
        if (data == null) {
            searchData = '';
        } else {
            searchData = data;
        }

        HOBUdataServices.getTotalOrganogram(searchData).then(function (response) {
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
            $scope.chartData = [];
            $scope.chartData = newobject;
        })
    }

}])