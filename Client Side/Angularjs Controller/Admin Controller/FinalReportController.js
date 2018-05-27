
myApp.controller('finalReportController', ['$scope', '$uibModal', '$filter', 'AdmindataSetting', 'OtherDataServices', '$route', 'AdminServices', 'AdmindataServices', function ($scope, $uibModal, $filter, AdmindataSetting, OtherDataServices, $route, AdminServices, AdmindataServices) {


    $scope.initi = function () {
        AdmindataServices.getFinalReportList().then(function (response) {
            $scope.Employees = response.data;
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

        AdmindataServices.getRoles().then(function (response) {
            $scope.Roles = response.data;
        })
    }

    $scope.buttonProcess = function () {
        $scope.AddButton = 'Add Employee';
        $scope.UpdateButton = 'Update Employee';
        $scope.RecoverButton = 'Recover';
        $scope.showHideButton = 'Show';
        $scope.UpdateDeadlineButton = 'Update';
        $scope.UpdateRole = 'Update Role';
        $scope.isProcessing = false;
    }

    $scope.buttonProcess();
    $scope.initi();

    //Dropdown list for group by Approve or Pending
    $scope.StatusBy = [{ id: 1, value: true, label: 'Approve' }, { id: 2, value: false, label: 'Pending' }];

    //Column Selection 
    AdminServices.getFinalReportList().then(function (response) { $scope.ColumnList = response.data });
    AdminServices.getFinalReportReportList().then(function (response) { $scope.SelectedColumn = response.data });
    AdminServices.getFinalReportTrueFalse().then(function (response) { $scope.selectCol = response.data });


    /* Cascading Section for each department */
    $scope.getSectionList = function (department) {
        if (department == null) {
            $scope.SectionList = [];
        } else
            $scope.SectionList = ($filter('filter')($scope.AllSectionList, { departmentId: department }));
    }


    //Change Events for Multiple dropdown
    $scope.changeEvents = {
        onItemSelect: function (item) {
            changeColumnViewShow(item);
        },
        onItemDeselect: function (item) {
            changeColumnViewShow(item);
        }
    };

    function changeColumnViewShow(item) {
        if (item.id == 1) {
            $scope.selectCol.EmployeeId = !$scope.selectCol.EmployeeId;
        } else if (item.id == 2) {
            $scope.selectCol.EmployeeName = !$scope.selectCol.EmployeeName;
        } else if (item.id == 3) {
            $scope.selectCol.Designation = !$scope.selectCol.Designation;
        } else if (item.id == 4) {
            $scope.selectCol.Department = !$scope.selectCol.Department;
        } else if (item.id == 5) {
            $scope.selectCol.Section = !$scope.selectCol.Section;
        } else if (item.id == 6) {
            $scope.selectCol.Email = !$scope.selectCol.Email;
        } else if (item.id == 7) {
            $scope.selectCol.JoiningDate = !$scope.selectCol.JoiningDate;
        } else if (item.id == 8) {
            $scope.selectCol.ReportTo = !$scope.selectCol.ReportTo;
        } else if (item.id == 9) {
            $scope.selectCol.ReportToDesignation = !$scope.selectCol.ReportToDesignation;
        } else if (item.id == 10) {
            $scope.selectCol.TotalScore = !$scope.selectCol.TotalScore;
        } else if (item.id == 11) {
            $scope.selectCol.Increament = !$scope.selectCol.Increament;
        }
    }

    //Multiple Dropsown Config
    $scope.dropConfig = {
        scrollable: true,
        scrollableHeight: '320px',
        showCheckAll: false,
        showUncheckAll: false
    }


    /* This Section for Pagination for Pending List */
    $scope.ViewItems = [{ value: 10, id: 10 }, { value: 20, id: 20 }, { value: 50, id: 50 }, { value: 100, id: 100 }, { value: 200, id: 200 }, { value: 500, id: 500 }];
    $scope.selectItem = $scope.ViewItems[0];
    $scope.ViewPerPage = 10;
    $scope.setitemsPerPage = function (num) {
        $scope.ViewPerPage = num.value;
    }


    $scope.GenerateFinalReport = function (data) {
        AdminServices.GenerateFinalReport(data);
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