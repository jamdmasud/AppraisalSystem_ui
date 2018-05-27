myApp.factory('OtherDataServices', ['$http', '$filter', 'serviceBasePath', function ($http, $filter, serviceBasePath) {
    var fac = {};

    fac.getDepartmentList = function () {
        return $http.get(serviceBasePath + '/api/Admin/AdminData/GetDepartments');
    }

    fac.getSectionList = function (data) {
        return $http.get(serviceBasePath + '/api/Admin/AdminData/GetSections');
    }

    fac.getDesignationList = function (data) {
        return $http.get(serviceBasePath + '/api/Admin/AdminData/GetDesignation');
    }

    fac.getJoinSectionList = function (Section, Department) {
        return alasql('SELECT * FROM ? AS Section JOIN ? AS Department ON  Section.DepartmentId=Department.id', [Section, Department]);
    }

    fac.getEmployeeNumbers = function () {
        return $http.get(serviceBasePath + '/api/Core/EmployeeSummery/GetEmployeeSummery');
    }

    fac.addEmployeeNumbers = function (data) {
        return $http.post(serviceBasePath + '/api/Core/EmployeeSummery/Save', data);
    }

    fac.updateEmployeeNumbers = function (data) {
        return $http.post(serviceBasePath + '/api/Core/EmployeeSummery/Save', data);
    }

    return fac;
}])