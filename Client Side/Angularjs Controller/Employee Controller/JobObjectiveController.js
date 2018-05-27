myApp.controller('jobObjectiveController', ['$scope', '$http', '$uibModal', 'EmployeeObjectiveService', '$routeParams', 'CreatePDF', 'EmployeeDataServices', '$route', function ($scope, $http, $uibModal, EmployeeObjectiveService, $routeParams, CreatePDF, EmployeeDataServices, $route) {

    $scope.init = function () {
        $scope.AddButton = 'Save';
        $scope.isProcessing = false;
        $scope.UpdateButton = 'Update';
    }

    $scope.getMyObjectiveList = function () {
        EmployeeDataServices.getMyObjective().then(function (response) {
            $scope.Objectives = response.data;
        })
    }

    $scope.init();
    $scope.getMyObjectiveList();

    //Column Selection 
    EmployeeObjectiveService.GetObjectiveColumnList().then(function (response) { $scope.ColumnList = response.data });
    EmployeeObjectiveService.GetObjectiveSeletedColumnList().then(function (response) { $scope.SelectedColumn = response.data });
    EmployeeObjectiveService.GetObjectiveSeletCol().then(function (response) { $scope.selectCol = response.data });

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
            $scope.selectCol.Code = !$scope.selectCol.Code;
        } else if (item.id == 2) {
            $scope.selectCol.Title = !$scope.selectCol.Title;
        } else if (item.id == 3) {
            $scope.selectCol.KPI = !$scope.selectCol.KPI;
        } else if (item.id == 4) {
            $scope.selectCol.Target = !$scope.selectCol.Target;
        } else if (item.id == 5) {
            $scope.selectCol.Weight = !$scope.selectCol.Weight;
        } else if (item.id == 6) {
            $scope.selectCol.Note = !$scope.selectCol.Note;
        } else if (item.id == 7) {
            $scope.selectCol.Status = !$scope.selectCol.Status;
        }
    }

    //Multiple Dropsown Config
    $scope.dropConfig = {
        scrollable: true,
        scrollableHeight: '200px',
        showCheckAll: false,
        showUncheckAll: false
    }

    //Group by Pending and Approve
    EmployeeObjectiveService.getGroupItem().then(function (response) { $scope.GroupBy = response.data });

    //Open Modal for Add Objective
    $scope.addObjective = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Modal View/addObejective.html',
            controller: 'jobObjectiveController',
            scope: $scope,
            size: 'lg'
        });
    }

    //Open Modal for View Objective
    $scope.viewObjective = function (data) {
        $scope.objective = data;
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Modal View/ObejectiveModal.html',
            controller: 'jobObjectiveController',
            scope: $scope,
            size: 'lg',
        });
    }

    //Open Modal for Update Objective
    $scope.updateObjective = function (data) {
        $scope.objectiveUpdate = {};
        angular.copy(data, $scope.objectiveUpdate);
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Modal View/updateObejectiveModal.html',
            controller: 'jobObjectiveController',
            scope: $scope,
            size: 'lg'
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

    $scope.GenerateExcel = function (data) {
        EmployeeDataServices.GenerateMyObjectiveList(data);
    }


    //Remove Objective
    $scope.removeObjective = function (objectiveId) {
        swal({
            title: "Warning!",
            text: "Are You sure to remove Objective?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, I do",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                EmployeeDataServices.removeObjective(objectiveId).then(function (response) {
                    swal({
                        title: 'Success',
                        text: 'Your successfully remove the objective',
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

    //Add the Objective
    $scope.AddObjective = function (data) {
        $scope.AddButton = 'Saving...';
        $scope.isProcessing = true;

        if (!data) {
            var Objective = {
                Title: $scope.objectiveNew.title,
                KPI: $scope.objectiveNew.kpi,
                Target: $scope.objectiveNew.target,
                Weight: $scope.objectiveNew.weight,
                Note: $scope.objectiveNew.note
            }

            EmployeeDataServices.StoreJobObjective(Objective).then(function (response) {
                swal('Successful', response.data, 'success');
                $scope.$dismiss();
                $scope.init();
                $route.reload();
            }, function (error) {
                swal('Error', error.data.message, 'error');
                $scope.init();
            })
        } else {
            $scope.init();
        }
    }

    //Update Objective
    $scope.UpdateObjective = function (data) {
        $scope.UpdateButton = 'Updating...';
        $scope.isProcessing = true;

        if (!data) {
            var Objective = {
                Id: $scope.objectiveUpdate.objectiveId,
                Title: $scope.objectiveUpdate.title,
                KPI: $scope.objectiveUpdate.kpi,
                Target: $scope.objectiveUpdate.target,
                Weight: $scope.objectiveUpdate.weight,
                Note: $scope.objectiveUpdate.note
            }
            EmployeeDataServices.UpdateJobObjective(Objective).then(function (response) {
                swal('Updated', 'Your Objective update succeessfully', 'success');
                $scope.$dismiss();
                $route.reload();
            }, function (error) {
                swal('Error', error.data.message, 'error');
                $scope.init();
            })
        } else
            $scope.init();

    }

}])