myApp.factory('AdmindataServices', ['$http', 'serviceBasePath', function ($http, serviceBasePath) {
    var fac = {};

    fac.getEmployeeList = function (data) {
        return $http.get(serviceBasePath + '/api/Admin/AdminData/GetAllEmployees');
    }


    fac.addDepartment = function (data) {
        return $http.post(serviceBasePath + '/api/Employees/Employees/SaveDepartment', data);
    }

    fac.addSection = function (data) {
        return $http.post(serviceBasePath + '/api/Employees/Employees/SaveSection', data);
    }

    fac.addDesignation = function (data) {
        return $http.post(serviceBasePath + '/api/Employees/Employees/SaveDesignation', data);
    }

    fac.updateDepartment = function (data) {
        return $http.post(serviceBasePath + '/api/Employees/Employees/SaveDepartment', data);
    }

    fac.updateSection = function (data) {
        return $http.post(serviceBasePath + '/api/Employees/Employees/SaveSection', data);
    }

    fac.updateDesignation = function (data) {
        return $http.post(serviceBasePath + '/api/Employees/Employees/SaveDesignation', data);
    }

    fac.getSingleEmployee = function (Id) {
        return $http.get(serviceBasePath + '/api/Admin/AdminData/GetObjectiveByEmployeeId/' + Id);
    }

    fac.RemoveEmployee = function (employeeid) {
        return $http.post(serviceBasePath + '/api/Admin/AdminActivities/DeleteEmployee/' + employeeid);
    }

    fac.getDeletedEmployeeList = function () {
        return $http.get(serviceBasePath + '/api/Admin/AdminData/GetAllDeletedEmployees');
    }

    fac.ActiveEmployee = function (employeeid) {
        return $http.post(serviceBasePath + '/api/Admin/AdminActivities/ActiveEmployee/' + employeeid);
    }

    fac.getRoles = function () {
        return $http.get('/HelperJSON/Roles.json');
    }

    fac.saveEmployee = function (data) {
        return $http.post(serviceBasePath + '/api/Account/Register', data);
    }

    fac.RecoverPassword = function (data) {
        return $http.post(serviceBasePath + '/api/Account/RecoveryPassword', data);
    }

    fac.UpdateJobObjectiveDeadlineByEmployee = function (data) {
        return $http.post(serviceBasePath + '/api/Admin/DirectorActivities/ChangeObjectiveDeadLine', data);
    }

    fac.UpdateAppraisalDeadlineByEmployee = function (data) {
        return $http.post(serviceBasePath + '/api/Admin/DirectorActivities/ChangeJobDescriptionDeadLine', data);
    }

    fac.getFinalReportList = function () {
        return $http.get(serviceBasePath + '/api/Admin/AdminData/GetAllObjectivesWithIncreamentForDirector');
    }

    fac.updateEmployeeInfo = function (Data) {
        return $http.post(serviceBasePath + '/api/Employees/Employees/save', Data);
    }

    fac.LockedUser = function (data) {
        return $http.post(serviceBasePath + '/api/Account/SetLocked', data);
    }

    fac.GetSelfAppraisalReport = function (data) {
        return $http.get(serviceBasePath + '/api/Employees/EmployeesData/GetEmployeeWhoHaveNotSubmitedObjective');
    }

    fac.GetAppraisalInfo = function (data) {
        return $http.get(serviceBasePath + '/api/Admin/AdminData/GetAppraisalInformation');
    }


    fac.GenerateJobDescriptionReport = function (data) {
        return $http.get(serviceBasePath + '/api/Employees/EmployeesData/GetEmployeeWhoHaveNotSubmitJobDescription');
    }
    return fac;
}])
