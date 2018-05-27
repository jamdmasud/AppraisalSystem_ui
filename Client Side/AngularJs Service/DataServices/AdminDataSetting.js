myApp.factory('AdmindataSetting', ['$http', 'serviceBasePath', function ($http, serviceBasePath) {
    var fac = {};

    fac.setObjectiveDeadline = function (data) {
        return $http.post(serviceBasePath + '/api/Admin/AdminActivities/SetObjectDeadline', data);
    }

    fac.setAppraisalDeadline = function (data) {
        return $http.post(serviceBasePath + '/api/Admin/AdminActivities/SetAppraisalDeadline', data);
    }

    //Missing
    fac.getDeadlines = function () {
        return $http.get(serviceBasePath + '/api/Admin/HeadOfBussinessUnit/GetDeadline');
    }

    fac.UpdateDeadline = function (data) {
        return $http.post(serviceBasePath + '/api/Admin/AdminActivities/UpdateAppraisalDeadline', data);
    }

    fac.getIncreamentList = function () {
        return $http.get(serviceBasePath + '/api/Admin/HeadOfBussinessUnit/GetIncrementData');
    }

    fac.changeIncreament = function (data) {
        return $http.post(serviceBasePath + '/api/Admin/AdminActivities/UpdateIncreamentTableData', data);
    }

    fac.getJobDescriptionChartData = function () {
        return $http.get(serviceBasePath + '/api/Core/Organogram/GetEmployeeNumberForJobDescription');
    }

    fac.getSelfAppraisalChartData = function () {
        return $http.get(serviceBasePath + '/api/Core/Organogram/GetEmployeeNumberForSelfAppraisal');
    }

    fac.getPerformanceAppraisalChartData = function () {
        return $http.get(serviceBasePath + '/api/Core/Organogram/GetEmployeeNumberForPerformenseAppraisal');
    }

    fac.getCompanyList = function () {
        return $http.get(serviceBasePath + '/api/Core/Company/Get');
    }

    fac.saveCompany = function (data) {
        return $http.post(serviceBasePath + '/api/Core/Company/Save', data);
    }

    fac.updateCompany = function (data) {
        return $http.post(serviceBasePath + '/api/Core/Company/Save', data);
    }

    fac.UpdateEmployeeRole = function (data) {
        return $http.post(serviceBasePath + '/api/Account/UpdateEmployeeRole', data);
    }

    return fac;
}])