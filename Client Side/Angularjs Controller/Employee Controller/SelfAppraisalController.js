myApp.controller('selfAppraisalController', ['$scope', '$uibModal', 'EmployeeObjectiveService', 'EmployeeDataServices', '$route', function ($scope, $uibModal, EmployeeObjectiveService, EmployeeDataServices, $route) {

    $scope.initial = function () {
        $scope.uploadButton = 'Upload';
        $scope.addButton = 'Submit';
        $scope.isProcess = false;
    }

    $scope.initial();


    $scope.getSelfAppraisalList = function () {
        EmployeeDataServices.getMyAppraisalObjective().then(function (response) {
            if (response.data != null) {
                $scope.ObjectiveList = response.data;
                $scope.Objectives = $scope.ObjectiveList.objectiveSub;
            } else
                $scope.ObjectiveList = null;
        })

    }

    $scope.getSelfAppraisalList();

    $scope.addSelfAppraisal = function () {
        $scope.OverAll = {
            personalDevelopmentPlan: '',
            id: $scope.ObjectiveList.id,
            employeeId: $scope.ObjectiveList.employeeId,
            overallScore: $scope.ObjectiveList.overallScore,
            overallComment: $scope.ObjectiveList.overallComment,
            personalDevelopmentPlan: $scope.ObjectiveList.personalDevelopmentPlan
        }

        console.log($scope.ObjectiveList);
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Modal View/addAppraisalModel.html',
            controller: 'selfAppraisalController',
            scope: $scope,
            size: 'lg'
        });
    }

    $scope.selection = [];

    EmployeeObjectiveService.getAppraisalScale().then(function (response) { $scope.selection = response.data; })

    $scope.AddSelfAppraisal = function (data) {
        $scope.addButton = 'Submitting..';
        $scope.isProcess = true;

        var listObjective = [];

        angular.forEach($scope.Objectives, function (objective) {
            var singleObjective = {};
            singleObjective.Id = objective.id;
            singleObjective.SelfAppraisal = objective.selfAppraisal;
            singleObjective.Comments = objective.comments;

            listObjective.push(singleObjective);
        })

        var SelfAppraisal = {
            Id: $scope.OverAll.id,
            OverallScore: $scope.OverAll.overallScore,
            OverallComment: $scope.OverAll.overallComment,
            PersonalDevelopmentPlan: $scope.OverAll.personalDevelopmentPlan,
            ObjectiveSub: listObjective
        }

        if (!data) {
            EmployeeDataServices.postSelfAppraisal(SelfAppraisal).then(function (response) {
                swal('Success', response.data, 'success');
                $scope.$dismiss();
                $route.reload();
            }, function (error) {
                swal('Error', error.data.message, 'error');
                $scope.initial();
            })
        } else {
            $scope.initial();
        }
    }

    /* Open Modal for Upload Evidence File */
    $scope.addEvidenceFile = function (data) {
        $scope.objectiveForm = { objectiveId: data };
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Modal View/fileUpload.html',
            controller: 'selfAppraisalController',
            scope: $scope,
            size: 'md'
        });
    }

    $scope.hasFile = true;

    $scope.getFiles = function ($files) {

        $scope.hasFile = false;
        $scope.imagesrc = [];

        for (var i = 0; i < $files.length; i++) {

            var reader = new FileReader();
            reader.fileName = $files[i].name;

            reader.onload = function (event) {

                var image = {};
                image.Name = event.target.fileName;
                var extn = image.Name.split(".").pop();
                image.Size = (event.total / 1024).toFixed(2);
                image.Src = provideDocImage(extn);
                $scope.imagesrc.push(image);
                $scope.$apply();
            }
            reader.readAsDataURL($files[i]);
        }

        $scope.Files = $files;
    }

    function provideDocImage(extension) {
        if (extension == 'doc' || extension == 'docx' || extension == 'dot' || extension == 'dotx' || extension == 'dotm') {
            return '\assets/img/doc.png';
        } else if (extension == 'xlsx' || extension == 'xlsb' || extension == 'xls' || extension == 'xlsm' || extension == 'xlm') {
            return '\assets/img/excel.png';
        } else if (extension == 'pptx' || extension == 'ppt' || extension == 'pptm' || extension == 'ppsm' || extension == 'potx') {
            return '\assets/img/ppt.png';
        } else if (extension == 'pdf') {
            return '\assets/img/pdf.png';
        } else if (extension == 'rar') {
            return '\assets/img/rar.png';
        } else if (extension == 'zip') {
            return '\assets/img/zip.png';
        } else
            return '\assets/img/document.png';
    }

    $scope.RemoveImage = function () {
        $scope.hasFile = true;
        $scope.imagesrc = [];

    }

    $scope.UploadFile = function () {

        if (!$scope.hasFile) {
            $scope.uploadButton = 'Uploading..';
            $scope.isProcess = true;

            //FILL FormData WITH FILE DETAILS.
            var data = new FormData();

            angular.forEach($scope.Files, function (value, key) {
                data.append(key, value);
            });

            data.append('ObjectiveModel', angular.toJson($scope.objectiveForm))

            EmployeeObjectiveService.AddDeal(data).then(function (response) {
                $scope.initial();
                swal("Success!", "Your file is upload successfully", "success");
                $route.reload();
                $scope.$dismiss();
            }, function () {
                swal("Warning!", "Something is wrong. Please try again", "warning");
                $scope.initial();
            });
        } else
            $scope.initial();
    }

    $scope.GenerateSelfAppraisalExcel = function (data) {
        EmployeeDataServices.GenerateMySelfAppraisalList(data);
    }



}])