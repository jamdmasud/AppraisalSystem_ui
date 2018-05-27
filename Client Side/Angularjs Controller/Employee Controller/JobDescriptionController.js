myApp.controller('jobDesController', ['$scope', '$uibModal', 'Cascading', '$window', 'CreatePDF', 'EmployeeDataServices', '$route', function ($scope, $uibModal, Cascading, $window, CreatePDF, EmployeeDataServices, $route) {

    $scope.init = function () {
        $scope.AddButton = 'Save';
        $scope.isProcessing = false;
        $scope.UpdateButton = 'Update';
    }

    $scope.buttonHandle = true;

    $scope.getJobDescription = function () {
        EmployeeDataServices.getMyJobDescription('EmployeeId').then(function (response) {
            $scope.account = response.data;
            if ($scope.account.jobPurpose == null)
                $scope.buttonHandle = true;
            else
                $scope.buttonHandle = false;
        })
    }

    $scope.init();
    $scope.getJobDescription();




    //Open Modal for Add Job Description
    $scope.addDescription = function () {

        $scope.jobDescription = {};
        angular.copy($scope.account, $scope.jobDescription);

        var modalInstance = $uibModal.open({
            templateUrl: '\View/Modal View/addJobDescription.html',
            controller: 'jobDesController',
            scope: $scope,
            size: 'lg'
        });
    }

    //Open Modal for Update Job Description
    $scope.updateDescription = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Modal View/UpdateJobdescription.html',
            controller: 'jobDesController',
            scope: $scope,
            size: 'lg'
        });
    }

    $scope.printJobDes = function (data) {
        var docDefination = CreatePDF.GenerateJobDescription(data);
        pdfMake.createPdf(docDefination).print();
    }
    $scope.downloadJobDes = function (data) {
        var docDefination = CreatePDF.GenerateJobDescription(data);
        pdfMake.createPdf(docDefination).download("myJob.pdf");
    }

    /* Add Job Description */
    $scope.AddJobDescription = function (data) {
        $scope.AddButton = 'Saving..';
        $scope.isProcessing = true;
        if (!data) {
            var EmployeeJobDescription = {
                JobPurposes: $scope.jobDescription.jobPurpose,
                KeyAccountabilities: $scope.jobDescription.keyAccountabilities
            }
            EmployeeDataServices.StoreJobDescription(EmployeeJobDescription).then(function () {
                swal('Successfull', 'Your Job Description is Successfully Store', 'success');
                $scope.getJobDescription();
                $scope.$dismiss();
                $route.reload();
            }, function (error) {
                swal('Error', error.data.message, 'error');
                $scope.init();
            })
        } else
            $scope.init();
    }

    /* Update Job Description */
    $scope.UpdateJobDescription = function (data) {
        $scope.UpdateButton = 'Updating...';
        $scope.isProcessing = true;
        if (!data) {
            var EmployeeJobDescription = {
                Id: $scope.account.jobdescriptionId,
                JobPurposes: $scope.account.jobPurpose,
                KeyAccountabilities: $scope.account.keyAccountabilities
            }
            EmployeeDataServices.UpdateJobDescription(EmployeeJobDescription).then(function () {
                swal('Successfull', 'Your Job Description is Successfully Store', 'success');
                $scope.getJobDescription();
                $scope.$dismiss();
                $route.reload();
            }, function (error) {
                swal('Error', error.data.message, 'error');
                $scope.init();
            })
        } else {
            $scope.init();
        }

    }
}])