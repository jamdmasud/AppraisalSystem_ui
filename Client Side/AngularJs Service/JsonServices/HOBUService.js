myApp.factory('HOBUServices', ['$http', function ($http) {
    var fac = [];

    //Employee List
    fac.GetEmployeeColumnList = function () {
        return $http.get('/HelperJSON/ForHOBU/EmployeeList.json')
    }

    fac.GetEmployeeSelectedColumn = function () {
        return $http.get('/HelperJSON/ForHOBU/EmployeeSelectedItems.json')
    }

    fac.GetEmployeeSelectedCol = function () {
        return $http.get('/HelperJSON/ForHOBU/EmployeeTrueFalse.json')
    }

    //Objective List
    fac.GetObjectiveColumnList = function () {
        return $http.get('/HelperJSON/ForHOBU/ObjectiveList.json')
    }

    fac.GetObjectiveSelectedList = function () {
        return $http.get('/HelperJSON/ForHOBU/ObjectiveSelectedtem.json')
    }

    fac.GetObjectiveSelectedCol = function () {
        return $http.get('/HelperJSON/ForHOBU/ObjectiveTrueFalse.json')
    }

    //Performance List
    fac.GetPerformanceList = function () {
        return $http.get('/HelperJSON/ForHOBU/PerformanceList.json')
    }

    fac.GetPerformanceSelectedList = function () {
        return $http.get('/HelperJSON/ForHOBU/PerformanceSelectedItems.json')
    }

    fac.GetPerformanceSelectedCol = function () {
        return $http.get('/HelperJSON/ForHOBU/PerformanceTrueFalse.json')
    }

    fac.getAppraisalScale = function () {
        return $http.get('/HelperJSON/SimpleWork/SelfAppraisal.json');
    }

    return fac;
}])