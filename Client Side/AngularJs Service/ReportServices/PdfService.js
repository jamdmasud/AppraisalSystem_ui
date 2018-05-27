myApp.factory('CreatePDF', ['$filter', function ($filter) {
    var fac = [];

    fac.GenerateJobDescription = function (data) {
        var date = new Date(data.joiningDate);
        var joinDate = $filter('date')(date, 'dd/MM/yyyy');

        var status = '';
        if (data.isHOBUConfirmed) {
            status = 'Approve'
        } else
            status = 'Pending'

        var docDefination = {
            content: [
                {
                    image: 'data:image/png;base64,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',
                    width: 100,
                    height: 30,
                    alignment: 'center',
                    margin: [0, 0, 0, 10]
                },
                {
                    text: 'Employee Information',
                    alignment: 'center',
                    style: 'header',
                    decoration: 'underline',
                    margin: [0, 0, 0, 20]
                },
                {
                    style: 'tableExample',
                    color: 'black',
                    table: {
                        widths: [100, 20, '*'],
                        headerRows: 2,
                        // keepWithHeaderRows: 1,
                        body: [
                            [{ text: 'Personal Information', style: 'Subheader', colSpan: 3, alignment: 'center' }, {}, {}],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [
                                {
                                    text: 'ID',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.employeeId,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Name',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.employeeName,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Email',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.email,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Status',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: status,
                                    style: 'textNormal'

                                }
                            ],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [{ text: 'Job Information', style: 'Subheader', colSpan: 3, alignment: 'center' }, {}, {}],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [
                                {
                                    text: 'Designation',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.designation,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Department',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.department,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Section',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.section,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Joining Date',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: joinDate,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Location',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.location,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Company',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.employeeCompany,
                                    style: 'textNormal'

                                }
                            ],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [{ text: 'Reports To', style: 'Subheader', colSpan: 3, alignment: 'center' }, {}, {}],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [
                                {
                                    text: 'Name',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.reportToName,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Designation',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.reportToDesignation,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Department',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.reportToDepartment,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Company',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.reportToCompany,
                                    style: 'textNormal'

                                }
                            ],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [{ text: 'Job Purpose', style: 'Subheader', colSpan: 3, alignment: 'left' }, {}, {}],
                            [{ text: data.jobPurpose, colSpan: 3, style: 'textSmall' }, {}, {}],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [{ text: 'Key Accountabilities', style: 'Subheader', colSpan: 3, alignment: 'left' }, {}, {}],
                            [{ text: data.keyAccountabilities, colSpan: 3, style: 'textSmall' }, {}, {}],

                        ]
                    },
                    layout: 'noBorders'
                },
            ],
            styles: {
                header: {
                    fontSize: 22,
                    bold: true,
                    alignment: 'justify',

                },
                Subheader: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'justify',
                    color: 'black',
                    fillColor: '#E2DCDC',
                },
                textBold: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'left',
                    color: 'black',
                },
                textNormal: {
                    fontSize: 14,
                    alignment: 'left',
                    color: 'black',
                },
                textWhite: {
                    color: 'white'
                },
                textSmall: {
                    fontSize: 12,
                    alignment: 'left',
                    color: 'black',
                }
            },
            pageSize: 'A4',

            // by default we use portrait, you can change it to landscape if you wish 
            pageOrientation: 'porttrait',

            // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins 
            pageMargins: [80, 40, 80, 30],
        }

        return docDefination;
    }

    fac.GenerateObjectiveReport = function (data) {

        var date = new Date(data.joiningDate);
        var joinDate = $filter('date')(date, 'dd/MM/yyyy');

        var docDefinition = {
            content: [
                {
                    image: 'data:image/png;base64,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',
                    width: 100,
                    height: 30,
                    alignment: 'center',
                    margin: [0, 0, 0, 20]
                },
                {
                    text: 'Employee Objective Information',
                    alignment: 'center',
                    style: 'header',
                    decoration: '',
                    margin: [0, 0, 0, 20]
                },
                {
                    color: 'black',
                    table: {
                        widths: [100, 20, '*'],
                        headerRows: 2,
                        // keepWithHeaderRows: 1,
                        body: [
                            [{ text: 'Employee Information', style: 'Subheader', colSpan: 3, alignment: 'center' }, {}, {}],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [
                                {
                                    text: 'ID',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.employeeId,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Name',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.employeeName,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Email',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.email,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Designation',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.designation,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Department',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.department,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Section',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.section,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Company',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.employeeCompany,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Joining Date',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: joinDate,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Reorts To',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.reportToName,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Designation',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.reportToDesignation,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Department',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.reportToDepartment,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Company',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.reportToCompany,
                                    style: 'textNormal'

                                }
                            ],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [{ text: 'Objective Information', style: 'Subheader', colSpan: 3, alignment: 'center' }, {}, {}],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [
                                {
                                    text: 'Objective Id',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.objectiveId,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Objective Title',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.title,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'KPI',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.kpi,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Target',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.target,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Weight',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.weight,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Note & Action',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.note,
                                    style: 'textNormal'

                                }
                            ],
                        ]
                    },
                    layout: 'noBorders'
                },
            ],
            styles: {
                header: {
                    fontSize: 22,
                    bold: true,
                    alignment: 'justify',

                },
                Subheader: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'justify',
                    color: 'black',
                    fillColor: '#E2DCDC',
                },
                textBold: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'left',
                    color: 'black',
                },
                textNormal: {
                    fontSize: 14,
                    alignment: 'left',
                    color: 'black',
                },
                textSmall: {
                    fontSize: 12,
                    alignment: 'left',
                    color: 'black',
                },
                textWhite: {
                    color: 'white'
                }
            },
            pageSize: 'A4',

            // by default we use portrait, you can change it to landscape if you wish 
            pageOrientation: 'porttrait',

            // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins 
            pageMargins: [80, 40, 80, 30],
        }
        return docDefinition;
    }

    fac.GenerateOtherObjectiveReport = function (data) {

        var date = new Date(data.joiningDate);
        var joinDate = $filter('date')(date, 'dd/MM/yyyy');

        var docDefinition = {
            content: [
                {
                    image: 'data:image/png;base64,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',
                    width: 100,
                    height: 30,
                    alignment: 'center',
                    margin: [0, 0, 0, 20]
                },
                {
                    text: 'Employee Objective Information',
                    alignment: 'center',
                    style: 'header',
                    decoration: '',
                    margin: [0, 0, 0, 20]
                },
                {
                    color: 'black',
                    table: {
                        widths: [100, 20, '*'],
                        headerRows: 2,
                        // keepWithHeaderRows: 1,
                        body: [
                            [{ text: 'Employee Information', style: 'Subheader', colSpan: 3, alignment: 'center' }, {}, {}],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [
                                {
                                    text: 'ID',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.employeeId,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Name',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.employeeName,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Email',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.email,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Designation',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.designation,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Department',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.department,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Section',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.section,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Joining Date',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: joinDate,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Company',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.employeeCompany,
                                    style: 'textNormal'

                                }
                            ],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [{ text: 'Reports To', style: 'Subheader', colSpan: 3, alignment: 'center' }, {}, {}],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [
                                {
                                    text: 'Name',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.reportToName,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Designation',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.reportToDesignation,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Department',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.reportToDepartment,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Company',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.reportToCompany,
                                    style: 'textNormal'

                                }
                            ],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [{ text: 'Objective Information', style: 'Subheader', colSpan: 3, alignment: 'center' }, {}, {}],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [
                                {
                                    text: 'Objective Id',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.objectiveId,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Objective Title',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.title,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'KPI',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.kpi,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Target',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.target,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Weight',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.weight,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Note & Action',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.note,
                                    style: 'textNormal'

                                }
                            ],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [{ text: 'Appraisal Information', style: 'Subheader', colSpan: 3, alignment: 'center' }, {}, {}],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [
                                {
                                    text: 'Self Appraisal',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.selfAppraisal,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Performance Appraisal',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.performanceAppraisal,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Comments',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: data.comments,
                                    style: 'textNormal'

                                }
                            ]
                        ]
                    },
                    layout: 'noBorders'
                },
            ],
            styles: {
                header: {
                    fontSize: 22,
                    bold: true,
                    alignment: 'justify',

                },
                Subheader: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'justify',
                    color: 'black',
                    fillColor: '#E2DCDC',
                },
                textBold: {
                    fontSize: 12,
                    bold: true,
                    alignment: 'left',
                    color: 'black',
                },
                textNormal: {
                    fontSize: 12,
                    alignment: 'left',
                    color: 'black',
                },
                textSmall: {
                    fontSize: 12,
                    alignment: 'left',
                    color: 'black',
                },
                textWhite: {
                    color: 'white'
                }
            },
            pageSize: 'A4',

            // by default we use portrait, you can change it to landscape if you wish 
            pageOrientation: 'porttrait',

            // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins 
            pageMargins: [80, 40, 80, 30],
        }

        return docDefinition;
    }

    fac.GeneratePerformanceReport = function (info, objective) {

        var date = new Date(info.joiningDate);
        var joinDate = $filter('date')(date, 'dd/MM/yyyy');


        /* This object for Footer Row that show Total Score */
        var FooterRow = [{ text: 'Total Score', style: 'textPBold', colSpan: 5, alignment: 'right' }, {}, {}, {}, {}, { text: info.totalScore, style: 'textPNormal' }];
        var SingleRow = [];

        objective.forEach(function (row, index) {
            var dataRow = [{ text: index + 1, style: 'textPNormal' }, { text: row.title, style: 'textPleftNormal' }, { text: row.weight, style: 'textPNormal' }, { text: row.selfAppraisal, style: 'textPNormal' }, { text: row.performanceAppraisal, style: 'textPNormal' },
            { text: row.score, style: 'textPNormal' }];
            SingleRow.push(dataRow);
        })
        SingleRow.push(FooterRow);

        var dd = {

            content: [
                {
                    image: 'data:image/png;base64,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',
                    width: 100,
                    height: 30,
                    alignment: 'center',
                    margin: [0, 0, 0, 20]
                },
                {
                    text: 'Employee Performance Appraisal Information',
                    alignment: 'center',
                    style: 'header',
                    decoration: '',
                    margin: [0, 0, 0, 20]
                },
                {
                    color: 'black',
                    table: {
                        widths: [100, 20, '*'],
                        headerRows: 2,
                        // keepWithHeaderRows: 1,
                        body: [
                            [{ text: 'Employee Information', style: 'Subheader', colSpan: 3, alignment: 'center' }, {}, {}],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [
                                {
                                    text: 'ID',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: info.employeeId,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Name',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: info.employeeName,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Email',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: info.email,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Designation',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: info.designation,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Department',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: info.department,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Section',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: info.section,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Company',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: info.employeeCompany,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Joining Date',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: joinDate,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Reort To',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: info.reportToName,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Designation',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: info.reportToDesignation,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Department',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: info.reportToDepartment,
                                    style: 'textNormal'

                                }
                            ],
                            [
                                {
                                    text: 'Company',
                                    style: 'textBold'

                                },
                                {
                                    text: ':',
                                    style: 'textBold'

                                },
                                {
                                    text: info.reportToCompany,
                                    style: 'textNormal'

                                }
                            ],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                            [{ text: 'Performance Appraisal Information', style: 'Subheader', colSpan: 3, alignment: 'center' }, {}, {}],
                            [{ text: 'g', colSpan: 3, style: 'textWhite' }, {}, {}],
                        ]
                    },
                    layout: 'noBorders'
                },
                {
                    color: 'black',
                    table: {
                        widths: [10, 190, 38, 50, 70, '*'],
                        headerRows: 2,
                        // keepWithHeaderRows: 1,
                        body: [
                            [{ text: 'SL', style: 'textPBold' }, { text: 'Title', style: 'textPBold' }, { text: 'Weight', style: 'textPBold' }, { text: 'Self Appraisal', style: 'textPBold' }, { text: 'Performance Appraisal', style: 'textPBold' }, { text: 'Score', style: 'textPBold' }],
                        ].concat(SingleRow)
                    },
                },
            ],
            styles: {
                header: {
                    fontSize: 20,
                    bold: true,
                    alignment: 'justify',

                },
                Subheader: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'justify',
                    color: 'black',
                    fillColor: '#E2DCDC',
                },
                textBold: {
                    fontSize: 12,
                    bold: true,
                    alignment: 'left',
                    color: 'black',
                },
                textNormal: {
                    fontSize: 12,
                    alignment: 'left',
                    color: 'black',
                },
                textSmall: {
                    fontSize: 12,
                    alignment: 'left',
                    color: 'black',
                },
                textWhite: {
                    color: 'white'
                },
                textPBold: {
                    fontSize: 10,
                    bold: true,
                    alignment: 'center',
                    color: 'black',
                },
                textPNormal: {
                    fontSize: 10,
                    bold: false,
                    alignment: 'center',
                    color: 'black',
                },
                textPleftNormal: {
                    fontSize: 10,
                    bold: false,
                    alignment: 'left',
                    color: 'black',
                }
            },

            pageSize: 'A4',

            // by default we use portrait, you can change it to landscape if you wish 
            pageOrientation: 'porttrait',

            // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins 
            pageMargins: [80, 40, 80, 30],
        }

        return dd;
    }

    fac.GenerateSelfAppraisalReport = function (employeeList) {

        var employeeListTemp = [];

        var i = 1;
        employeeList.forEach(function (employee) {
            var singleRow = [i, employee.employeeNumber, employee.employeeName, employee.designation, employee.department, employee.section, employee.reportToName];
            employeeListTemp.push(singleRow);
            i++;
        });

        var dd = {
            content: [
                {
                    image: 'data:image/png;base64,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',
                    width: 100,
                    height: 30,
                    alignment: 'center',
                    margin: [0, 0, 0, 10]
                },
                {
                    text: 'List of Employees (Job Objective Not Submitted)',
                    alignment: 'center',
                    style: 'header',
                    decoration: 'underline',
                    margin: [0, 0, 0, 20]
                },
                {
                    style: 'tableExample',
                    table: {
                        widths: [25, 50, 100, 75, 75, 70, 100],
                        headerRows: 1,
                        body: [
                            [
                                {
                                    text: 'SL',
                                    alignment: 'center',
                                    style: 'table_header'
                                },
                                {
                                    text: 'Emp. No.',
                                    alignment: 'center',
                                    style: 'table_header'
                                },
                                {
                                    text: 'Employee Name',
                                    alignment: 'center',
                                    style: 'table_header'
                                },
                                {
                                    text: 'Designation',
                                    alignment: 'center',
                                    style: 'table_header'
                                },
                                {
                                    text: 'Department',
                                    alignment: 'center',
                                    style: 'table_header'
                                },
                                {
                                    text: 'Section',
                                    alignment: 'center',
                                    style: 'table_header'
                                },
                                {
                                    text: 'Report To',
                                    alignment: 'center',
                                    style: 'table_header'
                                }
                            ]
                        ].concat(employeeListTemp)
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 13,
                    bold: true,
                    alignment: 'justify',

                },
                Subheader: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'justify',
                    color: 'black',
                    fillColor: '#E2DCDC',
                },
                textBold: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'left',
                    color: 'black',
                },
                textNormal: {
                    fontSize: 14,
                    alignment: 'left',
                    color: 'black',
                },
                textWhite: {
                    color: 'white'
                },
                textSmall: {
                    fontSize: 12,
                    alignment: 'left',
                    color: 'black',
                },
                tableExample: {
                    fontSize: 9,
                    margin: [0, 5, 0, 15]
                },
                table_header: {
                    bold: true
                }
            },
            pageSize: 'A4',
            pageOrientation: 'porttrait',
            pageMargins: [20, 40, 15, 15],
        }

        return dd;
    }

    fac.GenerateJobDescriptionReport = function (employeeList) {

        var employeeListTemp = [];

        var i = 1;
        employeeList.forEach(function (employee) {
            var singleRow = [i, employee.employeeNumber, employee.employeeName, employee.designation, employee.department, employee.section, employee.reportToName];
            employeeListTemp.push(singleRow);
            i++;
        });

        var dd = {
            content: [
                {
                    image: 'data:image/png;base64,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',
                    width: 100,
                    height: 30,
                    alignment: 'center',
                    margin: [0, 0, 0, 10]
                },
                {
                    text: 'List of Employees (Job Description Not Submitted)',
                    alignment: 'center',
                    style: 'header',
                    decoration: 'underline',
                    margin: [0, 0, 0, 20]
                },
                {
                    style: 'tableExample',
                    table: {
                        widths: [25, 50, 100, 75, 75, 70, 100],
                        headerRows: 1,
                        body: [
                            [
                                {
                                    text: 'SL',
                                    alignment: 'center',
                                    style: 'table_header'
                                },
                                {
                                    text: 'Emp. No.',
                                    alignment: 'center',
                                    style: 'table_header'
                                },
                                {
                                    text: 'Employee Name',
                                    alignment: 'center',
                                    style: 'table_header'
                                },
                                {
                                    text: 'Designation',
                                    alignment: 'center',
                                    style: 'table_header'
                                },
                                {
                                    text: 'Department',
                                    alignment: 'center',
                                    style: 'table_header'
                                },
                                {
                                    text: 'Section',
                                    alignment: 'center',
                                    style: 'table_header'
                                },
                                {
                                    text: 'Report To',
                                    alignment: 'center',
                                    style: 'table_header'
                                }
                            ]
                        ].concat(employeeListTemp)
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 13,
                    bold: true,
                    alignment: 'justify',

                },
                Subheader: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'justify',
                    color: 'black',
                    fillColor: '#E2DCDC',
                },
                textBold: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'left',
                    color: 'black',
                },
                textNormal: {
                    fontSize: 14,
                    alignment: 'left',
                    color: 'black',
                },
                textWhite: {
                    color: 'white'
                },
                textSmall: {
                    fontSize: 12,
                    alignment: 'left',
                    color: 'black',
                },
                tableExample: {
                    fontSize: 9,
                    margin: [0, 5, 0, 15]
                },
                table_header: {
                    bold: true
                }
            },
            pageSize: 'A4',
            pageOrientation: 'porttrait',
            pageMargins: [20, 40, 15, 15],
        }

        return dd;
    }

    return fac;
}])