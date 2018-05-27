
myApp.controller('appraisalInfoController', ['$scope', '$uibModal', '$filter', 'AdmindataSetting', 'OtherDataServices', '$route', 'AdminServices', 'AdmindataServices', function ($scope, $uibModal, $filter, AdmindataSetting, OtherDataServices, $route, AdminServices, AdmindataServices) {


    $scope.init = function () {
        AdmindataServices.GetAppraisalInfo().then(function (response) {
            $scope.Employees = response.data;
            console.log($scope.Employees);
        })
        OtherDataServices.getDepartmentList().then(function (response) {
            $scope.DepartmentList = response.data;
        })
        OtherDataServices.getSectionList().then(function (response) {
            $scope.AllSectionList = response.data;
        })

        OtherDataServices.getDesignationList().then(function (response) {
            $scope.DesignationList = response.data;
        })

        //AdmindataServices.getRoles().then(function (response) {
        //    $scope.Roles = response.data;
        //})
    }

    $scope.init();

    //Dropdown list for group by Approve or Pending
    $scope.StatusBy = [{ id: 1, value: true, label: 'Approve' }, { id: 2, value: false, label: 'Pending' }];

    //Column Selection 
    


    /* Cascading Section for each department */
    $scope.getSectionList = function (department) {
        if (department == null) {
            $scope.SectionList = [];
        } else
            $scope.SectionList = ($filter('filter')($scope.AllSectionList, { departmentId: department }));
    }


    

    /* This Section for Pagination for Pending List */
    $scope.ViewItems = [{ value: 10, id: 10 }, { value: 20, id: 20 }, { value: 50, id: 50 }, { value: 100, id: 100 }, { value: 200, id: 200 }, { value: 500, id: 500 }];
    $scope.selectItem = $scope.ViewItems[0];
    $scope.ViewPerPage = 10;
    $scope.setitemsPerPage = function (num) {
        $scope.ViewPerPage = num.value;
    }


    $scope.GenerateFinalReport = function (data) {
        AdminServices.GenerateAppraisalReport(data);
    }


    $scope.viewHelpScore = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/HelpTotalScore.html',
            controller: 'finalReportController',
            scope: $scope,
            size: 'lg'
        });
    }

}]);