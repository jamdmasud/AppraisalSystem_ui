myApp.controller('resetController', ['$scope', '$uibModal', '$routeParams', '$location', 'authService', 'errorService', '$window', function ($scope, $uibModal, $routeParams, $location, authService, errorService, $window) {

    $scope.buttonText = function () {
        $scope.resetButton = 'Set Password';
        $scope.isProcessing = false;
    }

    $scope.buttonText();

    $scope.ViewResetModal = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Authentication/ResetPassword.html',
            controller: 'resetController',
            scope: $scope,
            backdrop: 'static',
            backdropClass: 'ModalBackdrop',
            size: 'md',
        });
    }

    $scope.ResetPass = { id: '', code: '', NewPassword: '', ConfirmPassword: '' };

    $scope.Reset = function (invalid) {
        $scope.resetButton = 'Resetting..';
        $scope.isProcessing = true;

        $scope.ResetPass.id = $routeParams.id;
        $scope.ResetPass.code = $routeParams.code;

        if (!invalid) {
            authService.ResetPassword($scope.ResetPass).then(function (response) {
                swal('Success', response.data, 'success');
                $location.path('/login');
                $location.search({});
            }, function (error) {
                swal('Error', error.data.message, 'error');
                $scope.buttonText();
            })
        } else {
            $scope.buttonText();
        }
    }

    $scope.OpenResetModal = function () {

        $scope.ResetPass.id = $routeParams.id;
        $scope.ResetPass.code = $routeParams.code;

        if ($scope.ResetPass.id == null || $scope.ResetPass.code == null) {
            $location.path('/login');
            $location.search({});
        } else {
            $scope.ViewResetModal();
        }
    }


}])