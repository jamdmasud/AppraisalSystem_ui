myApp.factory('EmployeeDataServices', ['$http', 'serviceBasePath', function ($http, serviceBasePath) {
    var fac = [];

    fac.getEmployeeList = function (data) {
        return $http.get(serviceBasePath + '/api/Employees/EmployeesData/GetOtherEmployeesList');
    }

    fac.removeObjective = function (objectiveId) {
        return $http.get(serviceBasePath + '/api/Employees/JobObjectives/DeleteObjective/' + objectiveId);
    }

    fac.getOtherObjectiveList = function () {
        return $http.get(serviceBasePath + '/api/Employees/EmployeesData/GetOthersEmployeeObjectives');
    }

    fac.getMyObjective = function () {
        return $http.get(serviceBasePath + '/api/Employees/EmployeesData/GetIndividualEmployeeObjectiveList');
    }

    fac.getMyAppraisalObjective = function () {
        return $http.get(serviceBasePath + '/api/Employees/EmployeesData/GetSelfAppraisalForIndividualEmployee');
    }

    fac.getMyJobDescription = function (data) {
        return $http.get(serviceBasePath + '/api/Employees/EmployeesData/GetEmployeeJobDescriptionSingleObject');
    }

    fac.getObjectiveById = function (data) {
        return $http.get(serviceBasePath + '/api/Employees/EmployeesData/GetOthersObjectiveById/' + data);
    }

    fac.getEmployeeById = function (data) {
        return $http.get(serviceBasePath + '/api/Employees/EmployeesData/GetEmployeeById/' + data);
    }

    fac.allowUpdateJobDescription = function (employeeId) {
        return $http.get(serviceBasePath + '/api/Admin/AdminActivities/AllowUpdateJobDescriptionByHOBU/' + employeeId);
    }

    fac.GenerateMyObjectiveList = function (data) {

        var excelStyle = {
            sheetid: 'My Objective List',
            headers: true,
            column: {
                style: 'font-size:15px'
            },
            columns: [
                { columnid: 'objectiveId', title: 'Objective Id' },
                { columnid: 'title', title: 'Objective Title' },
                { columnid: 'kpi', title: 'Key Performance Indicators' },
                { columnid: 'target', title: 'Target' },
                { columnid: 'weight', title: 'Weight' },
                {
                    columnid: 'note',
                    title: 'Note & Action',
                    cell: {
                        value: function (value) {
                            if (value == null)
                                return '';
                            else
                                return value
                        }
                    }
                },
                {
                    columnid: 'isObjectApprove',
                    title: 'Status',
                    cell: {
                        value: function (value) { return (value ? 'Approve' : 'Pending') }
                    }
                },
            ]
        };

        alasql('SELECT * INTO XLS("MyObjectives.xls",?) FROM ?', [excelStyle, data]);
    }

    fac.GenerateMySelfAppraisalList = function (data) {

        var excelStyle = {
            sheetid: 'My Self Appraisal List',
            headers: true,
            column: {
                style: 'font-size:15px'
            },
            columns: [
                { columnid: 'objectiveId', title: 'Objective Id' },
                { columnid: 'title', title: 'Objective Title' },
                { columnid: 'kpi', title: 'Key Performance Indicators' },
                { columnid: 'target', title: 'Target' },
                { columnid: 'weight', title: 'Weight' },
                {
                    columnid: 'note',
                    title: 'Note & Action',
                    cell: {
                        value: function (value) {
                            if (value == null)
                                return '';
                            else
                                return value
                        }
                    }
                },
                {
                    columnid: 'comments',
                    title: 'Comments',
                    cell: {
                        value: function (value) {
                            if (value == null)
                                return '';
                            else
                                return value
                        }
                    }
                },
                {
                    columnid: 'selfAppraisal',
                    title: 'Self Appraisal',
                    cell: {
                        value: function (value) {
                            if (value == null)
                                return '';
                            else
                                return value
                        }
                    }
                },
            ]
        };

        alasql('SELECT * INTO XLS("MySelfAppraisal.xls",?) FROM ?', [excelStyle, data]);
    }

    fac.GenerateOtherObjectiveList = function (data) {

        var excelStyle = {
            sheetid: 'Others Objective List',
            headers: true,
            column: {
                style: 'font-size:15px'
            },
            columns: [
                { columnid: 'employeeId', title: 'Employee Id' },
                { columnid: 'employeeName', title: 'Employee Name' },
                { columnid: 'reportToName', title: 'Reposrts To' },
                { columnid: 'objectiveId', title: 'Objective Id' },
                { columnid: 'title', title: 'Objective Title' },
                { columnid: 'kpi', title: 'Key Performance Indicators' },
                { columnid: 'target', title: 'Target' },
                { columnid: 'weight', title: 'Weight' },
                {
                    columnid: 'note',
                    title: 'Note & Action',
                    cell: {
                        value: function (value) {
                            if (value == null)
                                return '';
                            else
                                return value
                        }
                    }
                },
                {
                    columnid: 'isObjectiveApproved',
                    title: 'Status',
                    cell: {
                        value: function (value) { return (value ? 'Approve' : 'Pending') }
                    }
                },
            ]
        };

        alasql('SELECT * INTO XLS("OthersObjectives.xls",?) FROM ? ORDER BY EmployeeId', [excelStyle, data]);
    }

    fac.GenerateOtherEmployeeList = function (data) {

        var excelStyle = {
            sheetid: 'Others Employee List',
            headers: true,
            column: {
                style: 'font-size:15px'
            },
            columns: [
                { columnid: 'employeeId', title: 'Employee Id' },
                { columnid: 'employeeName', title: 'Employee Name' },
                { columnid: 'designation', title: 'Designation' },
                { columnid: 'section', title: 'Section' },
                { columnid: 'department', title: 'Department' },
                {
                    columnid: 'email',
                    title: 'Email',
                    cell: {
                        value: function (value) {
                            if (value == null)
                                return '';
                            else
                                return value
                        }
                    }
                },
                { columnid: 'joiningDate', title: 'Joining Date' },
                { columnid: 'location', title: 'Location' },
                { columnid: 'reportTo', title: 'Reports To' },
                { columnid: 'reportToDesignation', title: 'Report To Designation' },
                { columnid: 'reportToDepartment', title: 'Report To Department' },
                {
                    columnid: 'jobPurpose',
                    title: 'Job Purpose',
                    cell: {
                        value: function (value) {
                            if (value == null)
                                return '';
                            else
                                return value
                        }
                    }
                },
                {
                    columnid: 'keyAccountabilities',
                    title: 'Key Accountabilities',
                    cell: {
                        value: function (value) {
                            if (value == null)
                                return '';
                            else
                                return value
                        }
                    }
                },
                {
                    columnid: 'isHOBUConfirmed',
                    title: 'Status',
                    cell: {
                        value: function (value) { return (value ? 'Approve' : 'Pending') }
                    }
                },
            ]
        };

        alasql('SELECT employeeId,employeeName,designation,section,department,email,CONVERT(STRING,joiningDate,103) as joiningDate,location,reportTo,reportToDesignation,reportToDepartment,jobPurpose,keyAccountabilities,isHOBUConfirmed INTO XLS("OthersEmployee.xls",?) FROM ? ORDER BY EmployeeName', [excelStyle, data]);
    }

    fac.StoreJobDescription = function (data) {
        return $http.post(serviceBasePath + '/api/JobDescription/JobDescription/Save', data);
    }

    fac.UpdateJobDescription = function (data) {
        return $http.post(serviceBasePath + '/api/JobDescription/JobDescription/UpdateJobDescripsion', data);
    }

    fac.StoreJobObjective = function (data) {
        return $http.post(serviceBasePath + '/api/Employees/JobObjectives/SaveObjective', data);
    }

    fac.UpdateJobObjective = function (data) {
        return $http.post(serviceBasePath + '/api/Employees/JobObjectives/SaveObjective', data);
    }

    fac.postSelfAppraisal = function (data) {
        return $http.post(serviceBasePath + '/api/Employees/Employees/SaveSeflAppraisal', data);
    }

    fac.isApproveObjective = function (objectiveId) {
        return $http.get(serviceBasePath + '/api/Admin/AdminActivities/ApproveObjectiveByReportee/' + objectiveId);
    }

    fac.disapproveObjective = function (objectiveId) {
        return $http.get(serviceBasePath + '/api/Admin/AdminActivities/DisapproveObjective/' + objectiveId);
    }

    fac.isApproveJobDescription = function (jobDescriptionId) {
        return $http.get(serviceBasePath + '/api/Admin/AdminActivities/ApproveJobDescriptionByReportee/' + jobDescriptionId);
    }

    return fac;
}])