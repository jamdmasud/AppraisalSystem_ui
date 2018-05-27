myApp.controller('settingController', ['$scope', '$uibModal', '$filter', 'AdmindataSetting', 'OtherDataServices', '$route', function ($scope, $uibModal, $filter, AdmindataSetting, OtherDataServices, $route) {


    $scope.initi = function () {

        OtherDataServices.getDepartmentList().then(function (response) {
            $scope.DepartmentList = response.data;
        })
        AdmindataSetting.getDeadlines().then(function (response) {
            $scope.Deadlines = response.data;
        })
        AdmindataSetting.getIncreamentList().then(function (response) {
            $scope.IncreamentList = response.data;
        })

        AdmindataSetting.getCompanyList().then(function (response) {
            $scope.companyList = response.data;
        })

    }

    $scope.storeProcess = function () {
        $scope.objectiveButton = 'Add Deadline';
        $scope.appraisalButton = 'Add Deadline';
        $scope.updateButton = 'Update Deadline';
        $scope.increamentButton = 'Update Increament';
        $scope.addCompanyButton = 'Add Company Name';
        $scope.updateCompanyButton = 'Update Company Name';
        $scope.isProcess = false;
    }

    $scope.initi();

    $scope.storeProcess();

    $scope.AddObjectivesDeadLine = function () {

        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/AddObjectiveDeadline.html',
            controller: 'settingController',
            scope: $scope,
            size: 'md'
        });
    }

    $scope.AddAppraisalDeadLine = function () {

        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/AddAppraisalDeadline.html',
            controller: 'settingController',
            scope: $scope,
            size: 'md'
        });
    }

    $scope.UpdateDeadline = function (data) {
        $scope.singleDeadline = {};
        angular.copy(data, $scope.singleDeadline);

        $scope.singleDeadline.jobObjectiveDeadline = new Date($scope.singleDeadline.jobObjectiveDeadline);
        $scope.singleDeadline.selfAppraisalDeadline = new Date($scope.singleDeadline.selfAppraisalDeadline);
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/updateDeadline.html',
            controller: 'settingController',
            scope: $scope,
            size: 'md'
        });
    }

    $scope.UpdateIncreament = function (data) {
        $scope.SingleIncreament = {};
        angular.copy(data, $scope.SingleIncreament);

        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/updateIncreament.html',
            controller: 'settingController',
            scope: $scope,
            size: 'md'
        });
    }

    $scope.AddCompany = function () {
        $scope.newCompany = {};
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/AddCompany.html',
            controller: 'settingController',
            scope: $scope,
            size: 'md'
        });
    }

    $scope.updateCompany = function (data) {
        $scope.newCompany = {};
        angular.copy(data, $scope.newCompany);
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/UpdateCompany.html',
            controller: 'settingController',
            scope: $scope,
            size: 'md'
        });
    }

    $scope.StoreCompany = function (invalid, data) {
        $scope.addCompanyButton = 'Adding...';
        $scope.updateCompanyButton = 'Updating...';
        $scope.isProcess = true;

        if (!invalid) {
            AdmindataSetting.saveCompany(data).then(function (response) {
                swal('Success', 'Company Name added successfully', 'success');
                $route.reload();
            }, function (error) {
                swal('Error', error.data.message, 'error');
                $scope.storeProcess();
            })
        } else {
            $scope.storeProcess();
        }
    }

    $scope.StoreObjectiveDeadline = function (invalid, StoreData) {
        $scope.objectiveButton = 'Adding...';
        $scope.isProcess = true;

        StoreData.JobObjectiveDeadline = $filter('date')(StoreData.JobObjectiveDeadline, "yyyy-MM-dd");

        if (!invalid) {
            AdmindataSetting.setObjectiveDeadline(StoreData).then(function (response) {
                swal('Success', 'Job Objective Deadline submit successfully', 'success');
                $route.reload();
            }, function (error) {
                swal('Error', error.data.message, 'error');
                $scope.storeProcess();
            })
        } else {
            $scope.storeProcess();
        }
    }

    $scope.StoreAppraisalDeadline = function (invalid, StoreData) {
        $scope.appraisalButton = 'Adding...';
        $scope.isProcess = true;

        StoreData.SelfAppraisalDeadline = $filter('date')(StoreData.SelfAppraisalDeadline, "yyyy-MM-dd");

        if (!invalid) {
            AdmindataSetting.setAppraisalDeadline(StoreData).then(function (response) {
                swal('Success', 'Self Appraisal Deadline submit successfully', 'success');
                $route.reload();
            }, function (error) {
                swal('Error', error.data.message, 'error');
                $scope.storeProcess();
            })
        } else {
            $scope.storeProcess();
        }
    }

    $scope.UpdateDeadlineInfo = function (invalid, data) {
        $scope.updateButton = 'Updating...';
        $scope.isProcess = true;

        var storeData = {
            DepartmentId: data.departmentId,
            JobObjectiveDeadline: data.jobObjectiveDeadline,
            SelfAppraisalDeadline: data.selfAppraisalDeadline
        }

        if (!invalid) {
            AdmindataSetting.UpdateDeadline(storeData).then(function (response) {
                swal('Success', 'Deadline is updated', 'success');
                $route.reload();
            }, function (error) {
                swal('Error', error.data.message, 'error');
                $scope.storeProcess();
            })
        } else {
            $scope.storeProcess();
        }
    }

    $scope.UpdateIncreamentInfo = function (invalid) {
        $scope.increamentButton = 'Updating...';
        $scope.isProcess = true;

        var UpdateData = {
            Id: $scope.SingleIncreament.id,
            lowerScore: $scope.SingleIncreament.lowerScore,
            upperScore: $scope.SingleIncreament.upperScore,
            Promotion: $scope.SingleIncreament.promotion
        }

        if (!invalid) {
            AdmindataSetting.changeIncreament(UpdateData).then(function (response) {
                swal('Updated', 'The data is update successfully', 'success');
                $scope.$dismiss();
                $route.reload();
            }, function (error) {
                swal('Error', error.data.message, 'error');
                $scope.storeProcess();
            })
        } else {
            $scope.storeProcess();
        }
    }

}]);