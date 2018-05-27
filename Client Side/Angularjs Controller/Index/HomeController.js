myApp.controller('homeController', ['$scope', '$uibModal', '$location', 'authService', 'AdmindataSetting', function ($scope, $uibModal, $location, authService, AdmindataSetting) {

    $scope.initial = function () {
        $scope.changeButton = 'Change Password';
        $scope.isProcessing = false;
    }

    $scope.Dataload = function () {
        AdmindataSetting.getJobDescriptionChartData().then(function (response) {
            $scope.JobChart = response.data;
        })

        AdmindataSetting.getSelfAppraisalChartData().then(function (response) {
            $scope.SelfChart = response.data;
        })

        AdmindataSetting.getPerformanceAppraisalChartData().then(function (response) {
            $scope.PerformanceChart = response.data;
        })
    }

    $scope.Dataload();

    $scope.getAuthorization = function () {
        var auth = authService.getRoleName();
        $scope.Role = auth.Role;
        $scope.Name = auth.Name;
    }

    $scope.getAuthorization();

    $scope.initial();

    $scope.ChangePassword = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Authentication/changePassword.html',
            controller: 'homeController',
            scope: $scope,
            size: 'md',
        });
    }

    $scope.ChangePasswordRequest = function (invalid) {
        $scope.changeButton = 'Changing...';
        $scope.isProcessing = true;

        if (!invalid) {
            authService.changePassword($scope.changePass).then(function (response) {
                swal('Success', 'Password change successfully', 'success');
                $scope.$dismiss();
            }, function (error) {
                console.log(error);
                swal('Error', 'Something is wrong', 'error');
                $scope.initial();
            })
        } else {
            $scope.initial();
        }
    }

    $scope.logout = function () {
        authService.logOut();
        $location.path('/login');

    }


    $scope.PieChart2 = function (data) {
        var pieData = [{ key: 'Submitted', y: data.submited }, { key: 'UnSubmitted', y: data.unsubmited }]
        return pieData;
    }


    $scope.xFunction = function () {
        return function (d) {
            return d.key;
        };
    }
    $scope.yFunction = function () {
        return function (d) {
            return d.y;
        };
    }

    var colorArray = ['#05860C', '#B2051A'];
    $scope.colorFunction = function () {
        return function (d, i) {
            return colorArray[i];
        };
    }


}])