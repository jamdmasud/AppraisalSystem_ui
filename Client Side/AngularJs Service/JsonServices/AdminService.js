myApp.factory('AdminServices', ['$http', function ($http) {
    var fac = [];

    //Employee List
    fac.GetEmployeeColumnList = function () {
        return $http.get('/HelperJSON/Admin/EmployeeList.json')
    }

    fac.GetEmployeeSelectedColumn = function () {
        return $http.get('/HelperJSON/Admin/EmployeeSelectedList.json')
    }

    fac.GetEmployeeSelectedCol = function () {
        return $http.get('/HelperJSON/Admin/EmployeeTrueFalse.json')
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


    fac.getFinalReportList = function () {
        return $http.get('/HelperJSON/Admin/FianlReportList.json');
    }

    fac.getFinalReportReportList = function () {
        return $http.get('/HelperJSON/Admin/FinalReporSelectedList.json');
    }

    fac.getFinalReportTrueFalse = function () {
        return $http.get('/HelperJSON/Admin/FinalReportTrueFalse.json');
    }


    fac.GenerateEmployeeListReport = function (data) {
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
                { columnid: 'joiningDate', title: 'Joining Date' },
                { columnid: 'location', title: 'Location' },
                {
                    columnid: 'reportToName',
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
                    columnid: 'reportToDesignation',
                    title: 'Report To Designation',
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
                    columnid: 'reportToDepartment',
                    title: 'Report To Department',
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

        alasql('SELECT employeeId,employeeName,designation,section,department,email,CONVERT(STRING,joiningDate,103) as joiningDate,location,reportToName,reportToDesignation,reportToDepartment,isHOBUConfirmed INTO XLS("AllEmployeeList.xls",?) FROM ? ORDER BY EmployeeName', [excelStyle, data]);
    }

    fac.GenerateFinalReport = function (data) {
        var excelStyle = {
            sheetid: 'Employee Final Appraisal List',
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
                { columnid: 'joiningDate', title: 'Joining Date' },
                {
                    columnid: 'reportToName',
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
                    columnid: 'reportToDesignation',
                    title: 'Report To Designation',
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
                    columnid: 'reportToDepartment',
                    title: 'Report To Department',
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
                    columnid: 'increament',
                    title: 'Increament',
                    cell: {
                        value: function (value) {
                            if (value == null)
                                return '';
                            else
                                return value
                        }
                    }
                },
                { title: 'Salary' },
                { title: 'Increament' },
                { title: 'Total Salary' }
            ]
        };

        alasql('SELECT employeeId,employeeName,designation,section,department,email,CONVERT(STRING,joiningDate,103) as joiningDate,reportToName,reportToDesignation,reportToDepartment,totalScore,increaqment INTO XLS("EmployeeListFinalReport.xls",?) FROM ? ORDER BY EmployeeName', [excelStyle, data]);
    }

    fac.GenerateAppraisalReport = function (data) {
        var excelStyle = {
            sheetid: 'Employee Appraisal Information',
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
                    columnid: 'reportToName',
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
                    columnid: 'increament',
                    title: 'Increament',
                    cell: {
                        value: function (value) {
                            if (value === null)
                                return '';
                            else
                                return value
                        }
                    }
                },
                { columnid: 'title', title: 'Title' },
                { columnid: 'weight', title: 'Weight' },
                { columnid: 'selfAppraisal', title: 'Self Appraisal' },
                { columnid: 'perfomenseAppraisal', title: 'Performance Appraisal' },
                { columnid: 'score', title: 'Score' },
            ]
        };

        alasql('SELECT employeeId,employeeName,designation,section,department,reportToName,totalScore,increament,title,weight,selfAppraisal,perfomenseAppraisal,score INTO XLS("EmployeeAppraisalReport.xls",?) FROM ? ORDER BY EmployeeName', [excelStyle, data]);
    }

    return fac;
}])