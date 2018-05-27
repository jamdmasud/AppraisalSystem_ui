myApp.controller('allEmployeeController', ['$scope', '$uibModal', 'AdminServices', 'CreatePDF', 'AdmindataServices', 'OtherDataServices', 'AdmindataSetting', '$filter', '$route', function ($scope, $uibModal, AdminServices, CreatePDF, AdmindataServices, OtherDataServices, AdmindataSetting, $filter, $route) {

    $scope.initi = function () {
        AdmindataServices.getEmployeeList('EmloyeeId').then(function (response) {
            $scope.Employees = response.data;
        })
        OtherDataServices.getDepartmentList().then(function (response) {
            $scope.DepartmentList = response.data;
        })
        OtherDataServices.getSectionList().then(function (response) {
            $scope.AllSectionList = response.data;
        })

        OtherDataServices.getDesignationList().then(function (response) {
            $scope.DesignationList = response.data;
        })

        AdmindataServices.getRoles().then(function (response) {
            $scope.Roles = response.data;
        })

        AdmindataSetting.getCompanyList().then(function (response) {
            $scope.companyList = response.data;
        })
    }
    $scope.buttonProcess = function () {
        $scope.AddButton = 'Add Employee';
        $scope.UpdateButton = 'Update Employee';
        $scope.RecoverButton = 'Recover';
        $scope.showHideButton = 'Show';
        $scope.UpdateRole = 'Update Role';
        $scope.UpdateObjectiveDeadlineButton = 'Update';
        $scope.UpdateAppraisalDeadlineButton = 'Update';
        $scope.isProcessing = false;
    }

    $scope.buttonProcess();
    $scope.initi();

    //Dropdown list for group by Approve or Pending
    $scope.StatusBy = [{ id: 1, value: true, label: 'Approve' }, { id: 2, value: false, label: 'Pending' }];

    //Column Selection 
    AdminServices.GetEmployeeColumnList().then(function (response) { $scope.ColumnList = response.data });
    AdminServices.GetEmployeeSelectedColumn().then(function (response) { $scope.SelectedColumn = response.data });
    AdminServices.GetEmployeeSelectedCol().then(function (response) { $scope.selectCol = response.data });


    /* Cascading Section for each department */
    $scope.getSectionList = function (department) {
        if (typeof department === "undefined") {
            $scope.SectionList = [];
        } else {
            $scope.SectionList = ($filter('filter')($scope.AllSectionList, { departmentId: department }));
        }
    }


    //Change Events for Multiple dropdown
    $scope.changeEvents = {
        onItemSelect: function (item) {
            changeColumnViewShow(item);
        },
        onItemDeselect: function (item) {
            changeColumnViewShow(item);
        }
    };

    function changeColumnViewShow(item) {
        if (item.id == 1) {
            $scope.selectCol.EmployeeId = !$scope.selectCol.EmployeeId;
        } else if (item.id == 2) {
            $scope.selectCol.EmployeeName = !$scope.selectCol.EmployeeName;
        } else if (item.id == 3) {
            $scope.selectCol.Designation = !$scope.selectCol.Designation;
        } else if (item.id == 4) {
            $scope.selectCol.Department = !$scope.selectCol.Department;
        } else if (item.id == 5) {
            $scope.selectCol.Section = !$scope.selectCol.Section;
        } else if (item.id == 6) {
            $scope.selectCol.Email = !$scope.selectCol.Email;
        } else if (item.id == 7) {
            $scope.selectCol.Location = !$scope.selectCol.Location;
        } else if (item.id == 8) {
            $scope.selectCol.JoiningDate = !$scope.selectCol.JoiningDate;
        } else if (item.id == 9) {
            $scope.selectCol.ReportTo = !$scope.selectCol.ReportTo;
        } else if (item.id == 10) {
            $scope.selectCol.ReportToDesignation = !$scope.selectCol.ReportToDesignation;
        } else if (item.id == 11) {
            $scope.selectCol.ReportToDepartment = !$scope.selectCol.ReportToDepartment;
        } else if (item.id == 12) {
            $scope.selectCol.Status = !$scope.selectCol.Status;
        }
    }

    //Multiple Dropsown Config
    $scope.dropConfig = {
        scrollable: true,
        scrollableHeight: '320px',
        showCheckAll: false,
        showUncheckAll: false
    }


    /* This Section for Pagination for Pending List */
    $scope.ViewItems = [{ value: 10, id: 10 }, { value: 20, id: 20 }, { value: 50, id: 50 }, { value: 100, id: 100 }, { value: 200, id: 200 }, { value: 500, id: 500 }];
    $scope.selectItem = $scope.ViewItems[0];
    $scope.ViewPerPage = 10;
    $scope.setitemsPerPage = function (num) {
        $scope.ViewPerPage = num.value;
    }


    $scope.AddEmployee = function () {
        $scope.EmployeeList = alasql('SELECT employeeId,employeeName,designation,department,section FROM ?', [$scope.Employees]);
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/AddEmployee.html',
            controller: 'allEmployeeController',
            scope: $scope,
            size: 'md',
        });
    }

    $scope.ViewEmployee = function (data) {
        $scope.Info = data;
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/EmployeeView.html',
            controller: 'allEmployeeController',
            scope: $scope,
            size: 'md',
        });
    }

    $scope.UpdateEmployee = function (data) {
        $scope.EmployeeList = alasql('SELECT employeeId,employeeName,designation,department,section FROM ?', [$scope.Employees]);
        $scope.Info = {};
        angular.copy(data, $scope.Info);
        $scope.Info.joiningDate = new Date($scope.Info.joiningDate);
        $scope.SectionList = $scope.AllSectionList;
        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/EmployeeUpdate.html',
            controller: 'allEmployeeController',
            scope: $scope,
            size: 'md',
        });
    }

    $scope.RemoveEmployee = function (data) {
        swal({
            title: "Warning!",
            text: "Are You sure remove the Employee " + data.employeeName + "?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, I do",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                AdmindataServices.RemoveEmployee(data.employeeId).then(function (response) {
                    swal("Success", "You have successfully remove the Employee " + data.employeeName, "success");
                    $route.reload();
                }, function (error) {
                    swal("Error", error.data.message, "error");
                })

            } else {
                swal.close();
            }
        });
    }

    $scope.ViewObjective = function (EmployeeID) {
        $scope.EmployeeObjectives = [];
        $scope.EmployeeInfo = {};

        AdmindataServices.getSingleEmployee(EmployeeID).then(function (response) {
            $scope.EmployeeInfo = response.data;
            $scope.EmployeeObjectives = $scope.EmployeeInfo.objectiveSub;

            var modalInstance = $uibModal.open({
                templateUrl: '\View/Super Admin Modal/ObjectiveView.html',
                controller: 'allEmployeeController',
                scope: $scope,
                size: 'md',
            });
        }, function (error) {
            swal('Warning', 'The Employee does not set any objective yet', 'warning');
        })


    }

    $scope.Settings = function (data) {
        $scope.Info = data;
        $scope.Recovery = { New: '', Confirm: '' };

        $scope.Info.jobObjectiveDeadline = new Date($scope.Info.jobObjectiveDeadline);
        $scope.Info.selfAppraisalDeadline = new Date($scope.Info.selfAppraisalDeadline);

        var modalInstance = $uibModal.open({
            templateUrl: '\View/Super Admin Modal/Settings.html',
            controller: 'allEmployeeController',
            scope: $scope,
            size: 'md',
        });
    }

    $scope.showRecoverPanel = function () {
        $scope.enable = !$scope.enable;
    }

    $scope.showDeadLinePanel = function () {
        $scope.enableDeadlinePanel = !$scope.enableDeadlinePanel;
        $scope.showHideButton = 'Hide';
        if ($scope.enableDeadlinePanel)
            $scope.showHideButton = 'Hide';
        else
            $scope.showHideButton = 'Show';

    }

    $scope.RecoverPassword = function (data, employeeId) {
        $scope.RecoverButton = 'Recovering..';
        $scope.isProcessing = true;

        $scope.RecoveryPass = { EmployeeId: employeeId, NewPassword: $scope.Recovery.New, ConfirmPassword: $scope.Recovery.Confirm };
        if (!data) {
            AdmindataServices.RecoverPassword($scope.RecoveryPass).then(function (response) {
                $scope.$dismiss();
                swal('Success', 'Password Set Successfully', 'success');
            }, function (error) {
                swal('Error', 'Something wrong', 'error');
                console.log(error)
                $scope.buttonProcess();

            })
        } else {
            $scope.buttonProcess();
        }
    }

    $scope.LockUser = function (data) {
        if (!data.isLocked) {
            swal({
                title: "Warning!",
                text: "Are You sure Unlock the User",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Unlock!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false,
                showLoaderOnConfirm: true
            }, function (isConfirm) {
                if (isConfirm) {

                    var LockData = {
                        EmployeeId: data.employeeId,
                        isLocked: data.isLocked
                    }

                    AdmindataServices.LockedUser(LockData).then(function (response) {
                        swal("Good News", "You have successfully Unlock the User", "success");
                    }, function (error) {
                        swal("Error", error.data.message, "error");
                        data.isLocked = !data.isLocked;
                        $scope.Info = data;
                        $scope.$apply();
                    })
                } else {
                    data.isLocked = !data.isLocked;
                    $scope.Info = data;
                    $scope.$apply();
                    swal.close();
                }
            });
        } else {
            swal({
                title: "Warning!",
                text: "Are You sure lock the User",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Lock!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false,
                showLoaderOnConfirm: true
            }, function (isConfirm) {
                if (isConfirm) {
                    var LockData = {
                        EmployeeId: data.employeeId,
                        isLocked: data.isLocked
                    }

                    AdmindataServices.LockedUser(LockData).then(function (response) {
                        swal("Good News", "You have successfully lock the User", "success");
                    }, function (error) {
                        swal("Error", error.data.message, "error");
                        data.isLocked = !data.isLocked;
                        $scope.Info = data;
                        $scope.$apply();
                    })

                } else {
                    data.isLocked = !data.isLocked;
                    $scope.Info = data;
                    $scope.$apply();
                    swal.close();
                }
            });
        }
    }


    /* Store Processing */
    $scope.StoreEmployee = function (data) {
        $scope.AddButton = 'Storing..';
        $scope.isProcessing = true;

        if (!data) {
            var Employee = {
                EmployeeId: $scope.New.EmployeeId,
                EmployeeName: $scope.New.EmployeeName,
                Email: $scope.New.Email,
                DesignationId: $scope.New.DesignationId,
                SectionId: $scope.New.SectionId,
                JoiningDate: $filter('date')($scope.New.JoiningDate, "yyyy-MM-dd"),
                Location: $scope.New.Location,
                ReportTo: $scope.New.ReportTo,
                RoleName: $scope.New.RoleName,
                groups: $scope.New.GroupName
            }

            AdmindataServices.saveEmployee(Employee).then(function (response) {
                swal('Success', response.data, 'success');
                $scope.$dismiss();
                $route.reload();
            }, function (error) {
                swal('Error', error.data.message, 'error');
                $scope.buttonProcess();
            })
        } else {
            $scope.buttonProcess();
        }
    }

    $scope.UpdatingEmployee = function (invalid, data) {

        var Employee = {
            EmployeeId: data.employeeId,
            EmployeeName: data.employeeName,
            Email: data.email,
            DesignationId: data.designationId,
            SectionId: data.sectionId,
            JoiningDate: $filter('date')(data.joiningDate, "yyyy-MM-dd"),
            Location: data.location,
            ReportTo: data.reportTo,
            groups: data.groups
        }

        $scope.UpdateButton = 'Updating..';
        $scope.isProcessing = true;
        if (!invalid) {
            AdmindataServices.updateEmployeeInfo(Employee).then(function (response) {
                swal('Success', response.data, 'success');
                $route.reload();
            }, function (error) {
                swal('Error', error.data.message, 'error');
                $scope.buttonProcess();
            })
        } else {
            $scope.buttonProcess();
        }
    }

    $scope.UpdateEmployeeRole = function (invalid, roleName, employeeId) {
        $scope.UpdateRole = 'Updating....';
        $scope.isProcessing = true;

        if (!invalid) {
            var data = {
                EmployeeId: employeeId,
                Role: roleName
            }
            swal({
                title: "Warning!",
                text: "Are You sure change Employee Role to " + roleName,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, I do!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false,
                showLoaderOnConfirm: true
            }, function (isConfirm) {
                if (isConfirm) {
                    AdmindataSetting.UpdateEmployeeRole(data).then(function (response) {
                        swal('Success', 'You have successfully update Employee Role ' + roleName, 'success');
                        $scope.buttonProcess();
                        $scope.$apply();
                    }, function (error) {
                        swal('Error!!', error.data.message, 'error');
                        $scope.buttonProcess();
                    })
                } else {
                    $scope.buttonProcess();
                    $scope.$apply();
                    swal.close();
                }
            });
        } else {
            $scope.buttonProcess();
        }
    }

    $scope.UpdateEmployeeObjectiveDeadLine = function (invalid, data) {
        $scope.UpdateObjectiveDeadlineButton = 'Updating...';
        $scope.isProcessing = true;
        var storeData = {
            EmployeeId: data.employeeId,
            NewDeadLine: data.jobObjectiveDeadline
        }

        if (!invalid) {
            AdmindataServices.UpdateJobObjectiveDeadlineByEmployee(storeData).then(function (response) {
                swal('Success', 'Successfully Date Change', 'success');
                $scope.buttonProcess();
            }, function (error) {
                swal('Error', error.data.message, 'error');
                $scope.buttonProcess();
                $scope.showDeadLinePanel();
            })
        } else
            $scope.buttonProcess();
    }


    $scope.UpdateAppraisalDeadline = function (invalid, data) {
        $scope.UpdateAppraisalDeadlineButton = 'Updating...';
        $scope.isProcessing = true;

        var storeData = {
            EmployeeId: data.employeeId,
            NewDeadLine: data.selfAppraisalDeadline
        }

        if (!invalid) {
            AdmindataServices.UpdateAppraisalDeadlineByEmployee(storeData).then(function (response) {
                swal('Success', 'Successfully Date Change', 'success');
                $scope.buttonProcess();
            }, function (error) {
                swal('Error', error.data.message, 'error');
                $scope.buttonProcess();
                $scope.showDeadLinePanel();
            })
        } else
            $scope.buttonProcess();
    }

    //Open Modal for Print Objective
    $scope.ReportPrint = function (data) {
        var docDefinition = CreatePDF.GenerateJobDescription(data);
        pdfMake.createPdf(docDefinition).print();
    }

    $scope.ReportDownload = function (data) {
        var docDefinition = CreatePDF.GenerateJobDescription(data);
        pdfMake.createPdf(docDefinition).download('EmployeeInformationReport.pdf');
    }

    $scope.GenerateReport = function (data) {
        AdminServices.GenerateEmployeeListReport(data);
    }

}])