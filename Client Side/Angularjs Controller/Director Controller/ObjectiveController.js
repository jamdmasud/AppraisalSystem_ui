myApp.controller('objectiveListController', ['$scope', '$uibModal', 'HOBUServices', '$routeParams', 'CreatePDF', 'HOBUdataServices', function ($scope, $uibModal, HOBUServices, $routeParams, CreatePDF, HOBUdataServices) {

    $scope.initi = function () {
        HOBUdataServices.getObjectiveList().then(function (response) {
            $scope.Objectives = response.data;
        })
    }

    $scope.initi();


    $scope.StatusBy = [{ id: 1, value: true, label: 'Approve' }, { id: 2, value: false, label: 'Pending' }];


    //Column Selection 
    HOBUServices.GetObjectiveColumnList().then(function (response) { $scope.ColumnList = response.data });
    HOBUServices.GetObjectiveSelectedList().then(function (response) { $scope.SelectedColumn = response.data });
    HOBUServices.GetObjectiveSelectedCol().then(function (response) { $scope.selectCol = response.data });


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
            $scope.selectCol.Code = !$scope.selectCol.Code;
        } else if (item.id == 4) {
            $scope.selectCol.Title = !$scope.selectCol.Title;
        } else if (item.id == 5) {
            $scope.selectCol.KPI = !$scope.selectCol.KPI;
        } else if (item.id == 6) {
            $scope.selectCol.Target = !$scope.selectCol.Target;
        } else if (item.id == 7) {
            $scope.selectCol.Weight = !$scope.selectCol.Weight;
        } else if (item.id == 8) {
            $scope.selectCol.Note = !$scope.selectCol.Note;
        } else if (item.id == 9) {
            $scope.selectCol.Status = !$scope.selectCol.Status;
        } else if (item.id == 10) {
            $scope.selectCol.SelfAppraisal = !$scope.selectCol.SelfAppraisal;
        } else if (item.id == 11) {
            $scope.selectCol.Comments = !$scope.selectCol.Comments;
        } else if (item.id == 12) {
            $scope.selectCol.EvidenceFile = !$scope.selectCol.EvidenceFile;
        } else if (item.id == 13) {
            $scope.selectCol.PerformanceAppraisal = !$scope.selectCol.PerformanceAppraisal;
        }
    }

    //Multiple Dropsown Config
    $scope.dropConfig = {
        scrollable: true,
        scrollableHeight: '320px',
        showCheckAll: false,
        showUncheckAll: false
    }


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
            templateUrl: '\View/SubAdmin_Modal/ObjectiveView.html',
            controller: 'objectiveListController',
            scope: $scope,
            size: 'lg',
        });
    }


    //Open Modal for Print Objective
    $scope.ReportPrint = function (data) {
        var docDefinition = CreatePDF.GenerateOtherObjectiveReport(data);
        pdfMake.createPdf(docDefinition).print();
    }

    $scope.ReportDownload = function (data) {
        var docDefinition = CreatePDF.GenerateOtherObjectiveReport(data);
        pdfMake.createPdf(docDefinition).download('EmployeeObjectiveReport.pdf');
    }

    $scope.GenerateDepartmentObjectiveListExcel = function (data) {
        HOBUdataServices.GenerateObjectiveList(data);
    }

}])