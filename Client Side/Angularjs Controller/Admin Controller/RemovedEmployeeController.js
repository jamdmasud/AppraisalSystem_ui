myApp.controller('allDeletedEmployeeController', ['$scope', '$uibModal', 'AdminServices', 'CreatePDF', 'AdmindataServices', 'OtherDataServices', 'AdmindataSetting', '$filter', '$route', function ($scope, $uibModal, AdminServices, CreatePDF, AdmindataServices, OtherDataServices, AdmindataSetting, $filter, $route) {

    $scope.initi = function () {
        AdmindataServices.getDeletedEmployeeList().then(function (response) {
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

    }

    $scope.initi();

    //Dropdown list for group by Approve or Pending
    $scope.StatusBy = [{ id: 1, value: true, label: 'Approve' }, { id: 2, value: false, label: 'Pending' }];

    //Column Selection 
    AdminServices.GetEmployeeColumnList().then(function (response) { $scope.ColumnList = response.data });
    AdminServices.GetEmployeeSelectedColumn().then(function (response) { $scope.SelectedColumn = response.data });
    AdminServices.GetEmployeeSelectedCol().then(function (response) { $scope.selectCol = response.data });


    /* Cascading Section for each department */
    $scope.getSectionList = function (department) {
        if (typeof department === "undefined") {
            $scope.SectionList = [];
        } else {
            $scope.SectionList = ($filter('filter')($scope.AllSectionList, { departmentId: department }));
        }
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
            $scope.selectCol.Location = !$scope.selectCol.Location;
        } else if (item.id == 8) {
            $scope.selectCol.JoiningDate = !$scope.selectCol.JoiningDate;
        } else if (item.id == 9) {
            $scope.selectCol.ReportTo = !$scope.selectCol.ReportTo;
        } else if (item.id == 10) {
            $scope.selectCol.ReportToDesignation = !$scope.selectCol.ReportToDesignation;
        } else if (item.id == 11) {
            $scope.selectCol.ReportToDepartment = !$scope.selectCol.ReportToDepartment;
        } else if (item.id == 12) {
            $scope.selectCol.Status = !$scope.selectCol.Status;
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


    $scope.ViewEmployee = function (data) {
        $scope.Info = data;
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/EmployeeView.html',
            controller: 'allDeletedEmployeeController',
            scope: $scope,
            size: 'md',
        });
    }


    $scope.RecoverEmployee = function (data) {
        swal({
            title: "Warning!",
            text: "Are You sure Recover the Employee " + data.employeeName + "?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, I do",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                AdmindataServices.ActiveEmployee(data.employeeId).then(function (response) {
                    swal("Success", "You have successfully Recover the Employee " + data.employeeName, "success");
                    $route.reload();
                }, function (error) {
                    swal("Error", error.data.message, "error");
                })

            } else {
                swal.close();
            }
        });
    }

    //Open Modal for Print Objective
    $scope.ReportPrint = function (data) {
        var docDefinition = CreatePDF.GenerateJobDescription(data);
        pdfMake.createPdf(docDefinition).print();
    }

    $scope.ReportDownload = function (data) {
        var docDefinition = CreatePDF.GenerateJobDescription(data);
        pdfMake.createPdf(docDefinition).download('EmployeeInformationReport.pdf');
    }

    $scope.GenerateReport = function (data) {
        AdminServices.GenerateEmployeeListReport(data);
    }

}])