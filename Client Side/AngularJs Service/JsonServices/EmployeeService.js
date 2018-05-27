myApp.factory('EmployeeObjectiveService', ['$http', 'serviceBasePath', function ($http, serviceBasePath) {
    var fac = {};

    fac.GetObjectiveColumnList = function () {
        return $http.get('/HelperJSON/ForIndividual/PersonalObjective.json')
    }

    fac.GetObjectiveSeletedColumnList = function () {
        return $http.get('/HelperJSON/ForIndividual/PersonalObjectiveSelectItem.json');
    }

    fac.GetObjectiveSeletCol = function () {
        return $http.get('/HelperJSON/ForIndividual/ObjectiveTrueFalse.json');
    }

    fac.getGroupItem = function () {
        return $http.get('/HelperJSON/ForIndividual/GroupItemForEmp.json');
    }

    fac.getAppraisalScale = function () {
        return $http.get('/HelperJSON/SimpleWork/SelfAppraisal.json');
    }

    fac.AddDeal = function (data) {
        return $http.post(serviceBasePath + "/api/Employees/JobObjectives/SaveEvidenceFile", data, {
            withCredentials: true, //must be true for sent file
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    fac.getOtherObjectiveColumnList = function () {
        return $http.get('/HelperJSON/ForReportee/Objectives.json')
    }

    fac.getOtherSelectedColumn = function () {
        return $http.get('/HelperJSON/ForReportee/ObjectiveSelectedItems.json')
    }

    fac.getOtherObjectiveSelected = function () {
        return $http.get('/HelperJSON/ForReportee/ObjectivesTrueFalse.json')
    }

    fac.getEmployeeColumnList = function () {
        return $http.get('/HelperJSON/ForReportee/EmployeeList.json');
    }

    fac.getEmployeeSelectedColumn = function () {
        return $http.get('/HelperJSON/ForReportee/EmployeeListSelectItem.json');
    }

    fac.getEmployeeSelected = function () {
        return $http.get('/HelperJSON/ForReportee/EmployeeTrueFalse.json');
    }

    fac.getEmployeeList = function (data) {
        return $http.get('/HelperJSON/MocData/EmployeeList.json');
    }

    fac.getOtherObjectiveList = function (data) {
        return $http.get('/HelperJSON/MocData/OtherObjective.json');
    }

    fac.getMyObjective = function (data) {
        return $http.get('/HelperJSON/MocData/EmployeeeObjective.json');
    }

    fac.getMyObjective = function (data) {
        return $http.get('/HelperJSON/MocData/EmployeeeObjective.json');
    }

    fac.getMyJobDescription = function (data) {
        return $http.get('/HelperJSON/MocData/EmployeeJobDes.json');
    }

    return fac;

}]);