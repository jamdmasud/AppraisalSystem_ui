myApp.controller('othersObjectiveListController', ['$scope', '$uibModal', 'EmployeeObjectiveService', '$routeParams', 'CreatePDF', 'EmployeeDataServices', '$route', '$filter', function ($scope, $uibModal, EmployeeObjectiveService, $routeParams, CreatePDF, EmployeeDataServices, $route, $filter) {

    $scope.getOtherObjectiveList = function () {
        EmployeeDataServices.getOtherObjectiveList().then(function (response) {
            $scope.Objectives = response.data;
        })
    }

    $scope.getOtherObjectiveList();

    EmployeeObjectiveService.getGroupItem().then(function (response) { $scope.StatusBy = response.data });

    //Angular Code for Multiple column show and hide
    $scope.dropConfig = {
        scrollable: true,
        scrollableHeight: '340px',
        showCheckAll: false,
        showUncheckAll: false
    }

    EmployeeObjectiveService.getOtherObjectiveColumnList().then(function (response) { $scope.AllColumn = response.data });
    EmployeeObjectiveService.getOtherSelectedColumn().then(function (response) { $scope.SelectedColumn = response.data });
    EmployeeObjectiveService.getOtherObjectiveSelected().then(function (response) { $scope.SelectCol = response.data });


    function changeColumnViewShow(item) {
        if (item.id == 1) {
            $scope.SelectCol.EmployeeID = !$scope.SelectCol.EmployeeID;
        } else if (item.id == 2) {
            $scope.SelectCol.EmployeeName = !$scope.SelectCol.EmployeeName;
        } else if (item.id == 3) {
            $scope.SelectCol.Code = !$scope.SelectCol.Code;
        } else if (item.id == 4) {
            $scope.SelectCol.Title = !$scope.SelectCol.Title;
        } else if (item.id == 5) {
            $scope.SelectCol.KPI = !$scope.SelectCol.KPI;
        } else if (item.id == 6) {
            $scope.SelectCol.Target = !$scope.SelectCol.Target;
        } else if (item.id == 7) {
            $scope.SelectCol.Weight = !$scope.SelectCol.Weight;
        } else if (item.id == 8) {
            $scope.SelectCol.Note = !$scope.SelectCol.Note;
        } else if (item.id == 9) {
            $scope.SelectCol.Status = !$scope.SelectCol.Status;
        }
    }

    $scope.changeEvents = {
        onItemSelect: function (item) {
            changeColumnViewShow(item);
        },
        onItemDeselect: function (item) {
            changeColumnViewShow(item);
        }
    };
    //End Column hide show function


    // This Section for Pagination for Pending List
    $scope.ViewItems = [{ value: 10, id: 10 }, { value: 20, id: 20 }, { value: 50, id: 50 }, { value: 100, id: 100 }, { value: 200, id: 200 }, { value: 500, id: 500 }];
    $scope.selectItem = $scope.ViewItems[0];
    $scope.ViewPerPage = 10;
    $scope.setitemsPerPage = function (num) {
        $scope.ViewPerPage = num.value;
    }

    //This Section for Modal
    $scope.viewObjectives = function (data) {
        $scope.objective = data;
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Modal View/OtherObjective.html',
            controller: 'othersObjectiveListController',
            scope: $scope,
            size: 'lg',
        });
    }

    //Open Modal for Print Objective
    $scope.ReportPrint = function (data) {
        var docDefinition = CreatePDF.GenerateObjectiveReport(data);
        pdfMake.createPdf(docDefinition).print();
    }

    $scope.ReportDownload = function (data) {
        var docDefinition = CreatePDF.GenerateObjectiveReport(data);
        pdfMake.createPdf(docDefinition).download('EmployeeObjective.pdf');
    }

    $scope.GenerateOtherObjectiveListExcel = function (data) {
        EmployeeDataServices.GenerateOtherObjectiveList(data);
    }

    $scope.ApproveObjective = function (ObjectiveId) {
        swal({
            title: "Warning!",
            text: "Are You sure to approve Objective?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, I approve",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                EmployeeDataServices.isApproveObjective(ObjectiveId).then(function (response) {
                    swal({
                        title: 'Success',
                        text: 'The Objective is approved',
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

    $scope.DisapproveObjective = function (objectiveId) {
        swal({
            title: "Warning!",
            text: "Are You sure to disapprove this Objective?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, I approve",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                EmployeeDataServices.disapproveObjective(objectiveId).then(function (response) {
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

    $scope.ViewObjectiveByParams = function () {
        var objectiveID = $routeParams.id;
        if (objectiveID) {
            setTimeout(function () {
                var data = ($filter('filter')($scope.Objectives, { objectiveId: objectiveID }));
                var SingleData = data[0];
                if (SingleData.objectiveId == null) {
                    swal('Error', 'The id is not exists', 'error');
                } else {
                    $scope.viewObjectives(SingleData);
                }
            }, 3000);

        }
    }

}])