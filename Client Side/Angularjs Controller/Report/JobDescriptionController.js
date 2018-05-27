myApp.controller('jobDescriptionNotSubmitController', ['$scope', 'AdmindataServices', '$uibModal', '$route', 'CreatePDF', function ($scope, AdmindataServices, $uibModal, $route, CreatePDF) {
    $scope.init = function () {
        $scope.button = 'Unsubmitted Employee\'s Report Download';
        $scope.isProcessign = false;
    }

    $scope.init();

    $scope.downloadReport = function () {
        $scope.button = 'Requesting....';
        $scope.isProcessign = true;
        AdmindataServices.GenerateJobDescriptionReport().then(function (response) {
            $scope.init();
            pdfMake.createPdf(CreatePDF.GenerateJobDescriptionReport(response.data)).download("employeelist(job-description-not-submitted).pdf");
        }, function (error) {
            swal("Error", error.data.message, "error");
            $scope.init();
        });
    }
}]);