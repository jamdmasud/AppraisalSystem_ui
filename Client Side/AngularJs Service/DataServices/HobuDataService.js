myApp.factory('HOBUdataServices', ['$http', 'serviceBasePath', function ($http, serviceBasePath) {
    var fac = {};

    fac.getEmployeeList = function (data) {
        return $http.get(serviceBasePath + '/api/Admin/HeadOfBussinessUnit/GetEmployeesForHOBU');
    }

    fac.getObjectiveList = function (data) {
        return $http.get(serviceBasePath + '/api/Admin/HeadOfBussinessUnit/GetIndividualEmployeeObjectiveList');
    }

    fac.getEmployeeListPerformanceAppraisal = function (data) {
        return $http.get(serviceBasePath + '/api/Admin/HeadOfBussinessUnit/GetEmployeesObjectiveForHOBUWithReportTo');
    }

    fac.getObjectiveListForAppraisal = function () {

        return $http.get(serviceBasePath + '/api/Admin/HeadOfBussinessUnit/GetEmployeesObjectiveForHOBUforPerformanceAppraisal');

    }

    fac.GenerateOtherEmployeeList = function (data) {

        var excelStyle = {
            sheetid: 'Employee List',
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
                { columnid: 'email', title: 'Email' },
                { columnid: 'joindate', title: 'Joining Date' },
                { columnid: 'location', title: 'Location' },
                { columnid: 'reportToName', title: 'Reports To' },
                { columnid: 'reportToDesignation', title: 'Report To Designation' },
                { columnid: 'reportToDepartment', title: 'Report To Department' },
                { columnid: 'jobPurpose', title: 'Job Purpose' },
                { columnid: 'keyAccountabilities', title: 'Key Accountabilities' },
                {
                    columnid: 'isHOBUConfirmed',
                    title: 'Status',
                    cell: {
                        value: function (value) { return (value ? 'Approve' : 'Pending') }
                    }
                },
            ]
        };

        alasql('SELECT employeeId,employeeName,designation,section,department,email,CONVERT(STRING,joiningDate,103) as joindate,location,reportToName,reportToDesignation,reportToDepartment,jobPurpose,keyAccountabilities,isHOBUConfirmed INTO XLS("EmployeeList.xls",?) FROM ? ORDER BY EmployeeName', [excelStyle, data]);
    }

    fac.GenerateObjectiveList = function (data) {

        var excelStyle = {
            sheetid: 'Department Objective List',
            headers: true,
            column: {
                style: 'font-size:15px'
            },
            columns: [
                { columnid: 'employeeId', title: 'Employee Id' },
                { columnid: 'employeeName', title: 'Employee Name' },
                { columnid: 'designation', title: 'Designation' },
                { columnid: 'department', title: 'Department' },
                { columnid: 'section', title: 'Section' },
                { columnid: 'reportToName', title: 'Reposrts To' },
                { columnid: 'reportToDesignation', title: 'Reposrts To Designation' },
                { columnid: 'objectiveId', title: 'Objective Id' },
                { columnid: 'title', title: 'Title' },
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
                {
                    columnid: 'performanceAppraisal',
                    title: 'Performance Appraisal',
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
                    columnid: 'isObjectApprove',
                    title: 'Status',
                    cell: {
                        value: function (value) { return (value ? 'Approve' : 'Pending') }
                    }
                },
            ]
        };

        alasql('SELECT * INTO XLS("Department Objective List.xls",?) FROM ? ORDER BY EmployeeName', [excelStyle, data]);
    }

    fac.GeneratePerformaceAppraissalList = function (data) {

        var excelStyle = {
            sheetid: 'Employee Performance Appraisal List',
            headers: true,
            column: {
                style: 'font-size:15px'
            },
            columns: [
                { columnid: 'employeeId', title: 'Employee Id' },
                { columnid: 'employeeName', title: 'Employee Name' },
                { columnid: 'designation', title: 'Designation' },
                { columnid: 'department', title: 'Department' },
                { columnid: 'section', title: 'Section' },
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
                {
                    columnid: 'reprotToName',
                    title: 'Report To Name',
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
                    columnid: 'overallScore',
                    title: 'Overall Score',
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
                    columnid: 'overallComments',
                    title: 'Overall Comments',
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
                    columnid: 'pdp',
                    title: 'Personal Development Plan',
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
                    columnid: 'totalScore',
                    title: 'Total Score',
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
                        value: function (value) { return (value ? 'Done' : 'Not Done') }
                    }
                },
            ]
        };

        alasql('SELECT * INTO XLS("EmployeePerformanceAppraisal.xls",?) FROM ? ORDER BY employeeName', [excelStyle, data]);
    }

    fac.postPerformanceAppraisal = function (data) {
        return $http.post(serviceBasePath + '/api/Employees/JobObjectives/SavePerformanceAppraisal', data);
    }

    fac.allowToEdit = function (employeeId) {
        return $http.post(serviceBasePath + '/api/Employees/JobObjectives/AllowToEditSelfAppraisal/' + employeeId);
    }

    fac.isApproveJobDescriptionByHOBU = function (JobDescriptionId) {
        return $http.get(serviceBasePath + '/api/Admin/AdminActivities/ApproveJobDescriptionByHOBU/' + JobDescriptionId);
    }

    fac.getOrganogramData = function () {
        return $http.get(serviceBasePath + '/api/Core/Organogram/GetMyEmployeesForOrganogram');
    }

    fac.getTotalOrganogram = function (data) {

        return $http.get(serviceBasePath + '/api/Core/Organogram/GetEmployeeForTotalOrganogram?id=' + data);
    }

    return fac;
}])