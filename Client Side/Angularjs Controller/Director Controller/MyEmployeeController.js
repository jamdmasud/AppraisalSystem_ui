myApp.controller('myEmployeeController', ['$scope', '$http', '$uibModal', 'EmployeeObjectiveService', 'CreatePDF', 'EmployeeDataServices', '$route', '$routeParams', '$filter', function ($scope, $http, $uibModal, EmployeeObjectiveService, CreatePDF, EmployeeDataServices, $route, $routeParams, $filter) {

    $scope.getEmployeeList = function () {
        EmployeeDataServices.getEmployeeList("EmployeeId").then(function (response) {
            $scope.Employees = response.data;
        })
    }

    $scope.getEmployeeList();

    // This Section for Pagination for Pending List
    $scope.ViewItems = [{ value: 10, id: 10 }, { value: 20, id: 20 }, { value: 50, id: 50 }, { value: 100, id: 100 }, { value: 200, id: 200 }];
    $scope.selectItem = $scope.ViewItems[0];
    $scope.ViewPerPage = 10;
    $scope.setitemsPerPage = function (num) {
        $scope.ViewPerPage = num.value;
    }


    $scope.StatusBy = [{ id: 1, value: '', label: 'All' }, { id: 2, value: true, label: 'Approve' }, { id: 3, value: false, label: 'Pending' }];
    $scope.selected = $scope.StatusBy[0];

    //Column Selection 
    EmployeeObjectiveService.getEmployeeColumnList().then(function (response) { $scope.ColumnList = response.data });
    EmployeeObjectiveService.getEmployeeSelectedColumn().then(function (response) { $scope.SelectedColumn = response.data });
    EmployeeObjectiveService.getEmployeeSelected().then(function (response) { $scope.selectCol = response.data });

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
            $scope.selectCol.EmployeeID = !$scope.selectCol.EmployeeID;
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
            $scope.selectCol.JobPurpose = !$scope.selectCol.JobPurpose;
        } else if (item.id == 9) {
            $scope.selectCol.KeyAccountatibilities = !$scope.selectCol.KeyAccountatibilities;
        } else if (item.id == 10) {
            $scope.selectCol.ReportTo = !$scope.selectCol.ReportTo;
        } else if (item.id == 11) {
            $scope.selectCol.Location = !$scope.selectCol.Location;
        } else if (item.id == 12) {
            $scope.selectCol.Status = !$scope.selectCol.Status;
        }

    }

    //Multiple Dropsown Config
    $scope.dropConfig = {
        scrollable: true,
        scrollableHeight: '350px',
        showCheckAll: false,
        showUncheckAll: false
    }

    $scope.EmployeeDetails = function (data) {
        $scope.Info = data;
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Modal View/MyEmployeeView.html',
            controller: 'myEmployeeController',
            scope: $scope,
            size: 'md',
        });
    }

    //Open Modal for Print Objective
    $scope.ReportPrint = function (data) {
        var docDefinition = CreatePDF.GenerateJobDescription(data);
        pdfMake.createPdf(docDefinition).print();
    }

    $scope.ReportDownload = function (data) {
        var docDefinition = CreatePDF.GenerateJobDescription(data);
        pdfMake.createPdf(docDefinition).download('EmployeeJobDescription.pdf');
    }

    $scope.GenerateOtherEmployeeExcel = function (data) {
        EmployeeDataServices.GenerateOtherEmployeeList(data);
    }

    /* Approve Job Description of Other Employee */
    $scope.ApproveJobDescription = function (EmployeeId) {
        swal({
            title: "Warning!",
            text: "Are You sure to approve Job Description",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, I agree",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                EmployeeDataServices.isApproveJobDescription(EmployeeId).then(function (response) {
                    swal({
                        title: 'Success',
                        text: 'The job Description is approve',
                        type: 'success',
                        closeOnConfirm: false
                    }, function (isConfirm) {
                        $route.reload();
                        swal.close();
                    })
                }, function (error) {
                    swal('Error', error.data.message, 'error');
                })
            } else {
                swal.close();
            }
        });
    }

    $scope.AllowUpdateJobDescription = function (employeeId) {
        EmployeeDataServices.allowUpdateJobDescription(employeeId).then(function (response) {
            swal({
                title: 'Success',
                text: response.data.message,
                type: 'success',
                closeOnConfirm: false
            }, function (isConfirm) {
                $route.reload();
                swal.close();
            })
        }, function (error) {
            swal('Error', error.data.message, 'error');
        })
    }

    $scope.ViewEmployeeByParams = function () {
        var EmployeeId = $routeParams.id;
        if (EmployeeId) {
            setTimeout(function () {
                var data = ($filter('filter')($scope.Employees, { employeeId: EmployeeId }));
                var SingleData = data[0];
                if (SingleData == undefined) {
                    swal('Error', 'The employee id is not exists', 'error');
                } else {
                    $scope.EmployeeDetails(SingleData);
                }
            }, 5000);

        }
    }

}])