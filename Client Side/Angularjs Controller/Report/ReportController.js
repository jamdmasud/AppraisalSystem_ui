myApp.controller('reportController', ['$scope', 'AdmindataServices', '$uibModal', '$route', 'CreatePDF', function ($scope, AdmindataServices, $uibModal, $route, CreatePDF) {
    $scope.init = function () {
        $scope.button = 'Unsubmitted Employee\'s Report Download';
        $scope.isProcessign = false;
    }

    $scope.init();

    $scope.downloadReport = function () {
        $scope.button = 'Requesting....';
        $scope.isProcessign = true;
        AdmindataServices.GetSelfAppraisalReport().then(function (response) {
            $scope.init();
            console.log(response.data)
            pdfMake.createPdf(CreatePDF.GenerateSelfAppraisalReport(response.data)).download("employeelist(job-objective-not-submitted).pdf");
        }, function (error) {
            swal("Error", error.data.message, "error");
            $scope.init();
        });
    }
}]);

