myApp.controller('performanceController', ['$scope', '$uibModal', 'HOBUServices', 'CreatePDF', 'HOBUdataServices', '$filter', '$route', function ($scope, $uibModal, HOBUServices, CreatePDF, HOBUdataServices, $filter, $route) {

    $scope.initi = function () {
        HOBUdataServices.getEmployeeListPerformanceAppraisal('EmloyeeId').then(function (response) {
            $scope.Employees = response.data;
        })

        HOBUdataServices.getObjectiveListForAppraisal().then(function (response) {
            $scope.ObjectiveList = response.data;
        })
    }
    $scope.button = function () {
        $scope.submitButton = 'Submit';
        $scope.isProcessign = false;
    }

    $scope.initi();
    $scope.button();



    /*Dropdown list for group by Approve or Pending*/
    $scope.StatusBy = [{ id: 1, value: true, label: 'Approve' }, { id: 2, value: false, label: 'Pending' }];

    /*Column Selection*/
    HOBUServices.GetPerformanceList().then(function (response) { $scope.ColumnList = response.data });
    HOBUServices.GetPerformanceSelectedList().then(function (response) { $scope.SelectedColumn = response.data });
    HOBUServices.GetPerformanceSelectedCol().then(function (response) { $scope.selectCol = response.data });

    /* Get Peformance Scale */
    HOBUServices.getAppraisalScale().then(function (response) { $scope.Scale = response.data });


    /* Change Events for Multiple dropdown */
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
            $scope.selectCol.ReportTo = !$scope.selectCol.ReportTo;
        } else if (item.id == 8) {
            $scope.selectCol.OverallScore = !$scope.selectCol.OverallScore;
        } else if (item.id == 9) {
            $scope.selectCol.Comments = !$scope.selectCol.Comments;
        } else if (item.id == 10) {
            $scope.selectCol.PDP = !$scope.selectCol.PDP;
        } else if (item.id == 11) {
            $scope.selectCol.TotalScore = !$scope.selectCol.TotalScore;
        } else if (item.id == 12) {
            $scope.selectCol.Status = !$scope.selectCol.Status;
        }
    }

    /* Multiple Dropsown Config */
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

    /* This Section for Modal */
    $scope.addPerformanceAppraisal = function (data) {
        $scope.info = data;
        $scope.Objectives = ($filter('filter')($scope.ObjectiveList, { employeeId: data.employeeId }));
        var modalInstance = $uibModal.open({
            templateUrl: '\View/SubAdmin_Modal/AddPerformanceAppraisal.html',
            controller: 'performanceController',
            scope: $scope,
            size: 'lg',
        });
    }

    $scope.viewPerformanceAppraisal = function (data) {
        $scope.info = data;
        console.log(data);
        $scope.Objectives = ($filter('filter')($scope.ObjectiveList, { EmployeeId: data.EmployeeId }));
        var modalInstance = $uibModal.open({
            templateUrl: '\View/SubAdmin_Modal/ViewPerformanceAppraisal.html',
            controller: 'performanceController',
            scope: $scope,
            size: 'lg',
        });
    }

    $scope.savePerformanceAppraisal = function (data) {
        $scope.submitButton = 'Submitting..';
        $scope.isProcessign = true;

        var listAppraisal = [];


        angular.forEach($scope.Objectives, function (value) {
            var singlePerformanceAppraisal = {};
            singlePerformanceAppraisal.ObjectiveId = value.objectiveId;
            singlePerformanceAppraisal.Weight = value.weight;
            singlePerformanceAppraisal.PerformanceAppraisal = value.performanceAppraisal;
            singlePerformanceAppraisal.performanceComment = value.performanceComment;

            listAppraisal.push(singlePerformanceAppraisal);
        })

        if (!data) {
            HOBUdataServices.postPerformanceAppraisal(listAppraisal).then(function (response) {
                swal('Success', 'Performance Appraisal submit successfully', 'success');
                $scope.$dismiss();
                $route.reload();
            }, function (error) {
                swal('Error', error.data, 'error');
                $scope.button();
            })
        } else {
            $scope.button();
        }
    }


    /* Open Modal for Print Objective */
    $scope.ReportPrint = function (employee, objectiveList) {
        var docDefinition = CreatePDF.GeneratePerformanceReport(employee, objectiveList);
        pdfMake.createPdf(docDefinition).print();
    }

    $scope.ReportDownload = function (employee, objectiveList) {
        var docDefinition = CreatePDF.GeneratePerformanceReport(employee, objectiveList);
        pdfMake.createPdf(docDefinition).download('EmployeePerformanceAppraisal.pdf');
    }

    $scope.GenerateAllEmployeeReport = function (data) {
        HOBUdataServices.GeneratePerformaceAppraissalList(data);
    }

    $scope.AllowToEdit = function (employeeId) {
        // HOBUdataServices.AllowToEdit()
        swal({
            title: "Warning!",
            text: "Are You sure to allow to edit self appraisal?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, I agree",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                HOBUdataServices.allowToEdit(employeeId).then(function (response) {
                    swal({
                        title: 'Success',
                        text: response.data,
                        type: 'success',
                        closeOnConfirm: false
                    }, function (isConfirm) {
                        $route.reload();
                        swal.close();
                    })
                }, function (error) {
                    swal('Error', error.data, 'error');
                })
            } else {
                swal.close();
            }
        });
    }

}])
