myApp.controller('totalEmployee',
    [
        '$scope', 'OtherDataServices', '$uibModal', '$route', function ($scope, OtherDataServices, $uibModal, $route) {

            $scope.loadData = function () {
                OtherDataServices.getEmployeeNumbers().then(function (response) {
                    $scope.getEmployeeNumbersList = response.data;
                    $scope.TotalNumbers = alasql('VALUE OF SELECT SUM(numberOfEmployees) FROM ?',
                        [$scope.getEmployeeNumbersList]);
                })

                OtherDataServices.getDepartmentList().then(function (response) {
                    $scope.DepartmentList = response.data;
                })
            }

            $scope.buttonProcess = function () {
                $scope.isProcessing = false;
                $scope.addButton = 'Add',
                    $scope.updateButton = 'Update'
            }

            $scope.loadData();
            $scope.buttonProcess();

            $scope.addEmployeeNumbers = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: '\View/TotalEmployee/AddNumbers.html',
                    controller: 'totalEmployee',
                    scope: $scope,
                    size: 'md',
                });
            }

            $scope.updateEmployeeNumber = function (data) {
                $scope.updateNumber = {};
                angular.copy(data, $scope.updateNumber);

                var modalInstance = $uibModal.open({
                    templateUrl: '\View/TotalEmployee/UpdateNumbers.html',
                    controller: 'totalEmployee',
                    scope: $scope,
                    size: 'md',
                });
            }

            $scope.storeEmployeeNumber = function (invalid, data) {
                $scope.addButton = 'Adding...';
                $scope.isProcessing = true;

                if (!invalid) {

                    OtherDataServices.addEmployeeNumbers(data).then(function (response) {

                        swal('Success', response.data, 'success');
                        $route.reload();

                    },
                        function (error) {
                            swal('Error', error.data.message, 'error');
                            $scope.buttonProcess();
                        })

                } else {
                    $scope.buttonProcess();
                }
            }

            $scope.updatingEmployeeNumbers = function (invalid, data) {
                $scope.updateButton = 'Updating...';
                $scope.isProcessing = true;

                if (!invalid) {

                    OtherDataServices.updateEmployeeNumbers(data).then(function (response) {

                        swal('Success', response.data, 'success');
                        $route.reload();

                    },
                        function (error) {
                            swal('Error', error.data.message, 'error');
                            $scope.buttonProcess();
                        })

                } else {
                    $scope.buttonProcess();
                }
            }

        }
    ]);