myApp.controller('departmentSectionController', ['$scope', '$uibModal', '$filter', 'AdmindataServices', 'OtherDataServices', '$route', function ($scope, $uibModal, $filter, AdmindataServices, OtherDataServices, $route) {


    $scope.initi = function () {

        OtherDataServices.getDepartmentList().then(function (response) {
            $scope.DepartmentList = response.data;
        })
        OtherDataServices.getSectionList().then(function (response) {
            $scope.SectionList = response.data;
        })

        OtherDataServices.getDesignationList().then(function (response) {
            $scope.DesignationList = response.data;
        })

    }
    $scope.storeProcess = function () {
        $scope.SectionButton = 'Add Section';
        $scope.DepartmentButton = 'Add Department';
        $scope.DesignationButton = 'Add Designation';
        $scope.SectionUpdate = 'Update Section';
        $scope.DepartmentUpdate = 'Update Department';
        $scope.DesignationUpdate = 'Update Designation';
        $scope.isProcess = false;
    }

    $scope.initi();
    $scope.storeProcess();




    $scope.UpdateSection = function (data) {
        $scope.objSection = {};
        angular.copy(data, $scope.objSection);
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/UpdateSection.html',
            controller: 'departmentSectionController',
            scope: $scope,
            size: 'md'
        });

    }

    $scope.UpdateDepartment = function (data) {
        $scope.objDepartment = {};
        angular.copy(data, $scope.objDepartment);
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/UpdateDepartment.html',
            controller: 'departmentSectionController',
            scope: $scope,
            size: 'md',
        });

    }

    $scope.UpdateDesignation = function (data) {
        $scope.objDesignation = {};
        angular.copy(data, $scope.objDesignation);
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/UpdateDesignation.html',
            controller: 'departmentSectionController',
            scope: $scope,
            size: 'md',
        });
    }

    $scope.AddDepartment = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '/View/Super Admin Modal/AddDepartment.html',
            controller: 'departmentSectionController',
            scope: $scope,
            size: 'md',
        });
    }

    $scope.AddSection = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/AddSection.html',
            controller: 'departmentSectionController',
            scope: $scope,
            size: 'md',
        });
    }

    $scope.AddDesignation = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/AddDesignation.html',
            controller: 'departmentSectionController',
            scope: $scope,
            size: 'md',
        });
    }


    $scope.StoreSection = function (data) {
        var newsection = {
            Id: '',
            Name: $scope.newSection.section,
            DeparmentId: $scope.newSection.departmentId
        };

        $scope.SectionButton = 'Storing...';
        $scope.isProcess = true;
        if (!data) {
            AdmindataServices.addSection(newsection).then(function (response) {
                swal('Successfull', 'New Section Added Successfully', 'success');
                $scope.$dismiss();
                $scope.storeProcess();
                $route.reload();
            }, function (error) {
                swal('Error', 'Something is error.Try again', 'error');
            })
        } else {
            $scope.storeProcess();
        }
    }

    $scope.StoreDepartment = function (data) {

        var newdept = {
            Id: '',
            Name: $scope.newDepartment
        };
        $scope.DepartmentButton = 'Storing...';
        $scope.isProcess = true;
        if (!data) {
            AdmindataServices.addDepartment(newdept).then(function (response) {
                $scope.$dismiss();
                $scope.storeProcess();
                swal({
                    title: 'Successful',
                    text: 'New Department Added Successfully',
                    type: 'success',
                    closeOnConfirm: false
                }, function () {
                    $route.reload();
                    swal.close();
                })

            }, function (error) {
                swal('Error', 'Something is error.Try again', 'error');
            })
        } else {
            $scope.storeProcess();
        }
    }

    $scope.StoreDesignation = function (data) {

        var newdesig = {
            Id: '',
            Name: $scope.newDesignation
        };

        $scope.DesignationButton = 'Storing...';
        $scope.isProcess = true;
        if (!data) {
            AdmindataServices.addDesignation(newdesig).then(function (response) {
                swal('Successfull', 'New Designation Added Successfully', 'success');
                $scope.$dismiss();
                $scope.storeProcess();
                $route.reload();
            }, function (error) {
                swal('Error', 'Something is error.Try again', 'error');
            })
        } else {
            $scope.storeProcess();
        }
    }

    $scope.UpdatingSection = function (data) {

        var updateSection = {
            Id: $scope.objSection.id,
            Name: $scope.objSection.section,
            DeparmentId: $scope.objSection.departmentId
        };

        $scope.SectionUpdate = 'Updating...';
        $scope.isProcess = true;

        if (!data) {
            AdmindataServices.addSection(updateSection).then(function (response) {
                swal('Updated', 'Section update Successfully', 'success');
                $scope.$dismiss();
                $scope.storeProcess();
                $route.reload();
            }, function (error) {
                swal('Error', 'Something is error.Try again', 'error');
            })
        } else {
            $scope.storeProcess();
        }
    }

    $scope.UpdatingDepartment = function (data) {

        var updateDept = {
            Id: $scope.objDepartment.id,
            Name: $scope.objDepartment.department
        };

        $scope.DepartmentUpdate = 'Updating...';
        $scope.isProcess = true;
        if (!data) {
            AdmindataServices.addDepartment(updateDept).then(function (response) {
                swal('Updated', 'Designation Update Successfully', 'success');
                $scope.$dismiss();
                $scope.storeProcess();
                $route.reload();
            }, function (error) {
                swal('Error', 'Something is error.Try again', 'error');
            })
        } else {
            $scope.storeProcess();
        }
    }

    $scope.UpdatingDesignation = function (data) {

        var updateDesignation = {
            Id: $scope.objDesignation.id,
            Name: $scope.objDesignation.designation
        };

        $scope.DesignationUpdate = 'Updating...';
        $scope.isProcess = true;
        if (!data) {
            AdmindataServices.addDesignation(updateDesignation).then(function (response) {
                swal('Updated', 'Designation update Successfully', 'success');
                $scope.$dismiss();
                $scope.storeProcess();
                $route.reload();
            }, function (error) {
                swal('Error', 'Something is error.Try again', 'error');
            })
        } else {
            $scope.storeProcess();
        }
    }

}]);