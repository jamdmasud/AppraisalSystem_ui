var myApp = angular.module('myApp', ['ngRoute','AuthApp', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'chieffancypants.loadingBar', 'angularjs-dropdown-multiselect', 'ngMessages', 'ngPassword', 'fileUploadApp', '720kb.datepicker', 'nvd3ChartDirectives']);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.caseInsensitiveMatch = true;


    $routeProvider
    .when('/', {
        redirectTo: '/home'
    })
    .when('/login', {
        templateUrl: 'View/Authentication/SimplePage.html',
        controller: 'loginController'
    })
    .when('/ResetPassword', {
        templateUrl: 'View/Authentication/ResetSimple.html',
        controller: 'resetController'
    })
    .when('/home', {
        templateUrl: 'View/home.html',
        controller: 'homeController',
        authorize: true
    })
    // Employee Profile Routing
    .when('/jobDescription', {
        templateUrl: 'View/Employee/jobDescription.html',
        controller: 'jobDesController',
        authorize: true
    })
    .when('/jobObjective', {
        templateUrl: 'View/Employee/jobObjective.html',
        controller: 'jobObjectiveController',
        authorize: true
    })
    .when('/selfAppraisal', {
        templateUrl: 'View/Employee/Self_Appraisal.html',
        controller: 'selfAppraisalController',
        authorize: true
    })
    .when('/othersObjectives', {
        templateUrl: 'View/Employee/OthersObjectives.html',
        controller: 'othersObjectiveListController',
        authorize: true
    })
    .when('/MyEmployee', {
        templateUrl: '/View/Employee/MyEmployee.html',
        controller: 'myEmployeeController',
        authorize: true
    })
    //Department Profile Routing
    .when('/DepartmentalOrganogram', {
        templateUrl: 'View/Sub Admin/departmentalOrganogram.html',
        controller: 'departmentOrganogramController',
        authorize: true
    })
    .when('/PerformanceAppraisal', {
        templateUrl: 'View/Sub Admin/PerformanceAppraisal.html',
        controller: 'performanceController',
        authorize: true
    })
    .when('/objectiveList', {
        templateUrl: 'View/Sub Admin/ObjectivesList.html',
        controller: 'objectiveListController',
        authorize: true
    })
    

    /* Admin Profile Section */
    .when('/AllEmployeeList', {
        templateUrl: 'View/Super Admin/EmployeeList.html',
        controller: 'allEmployeeController',
        authorize: true
    })
    .when('/objectiveLists', {
        templateUrl: 'View/Super Admin/ObjectiveLists.html',
        controller: 'objectiveListsController',
        authorize: true
    })
    .when('/DepartmentSection', {
        templateUrl: 'View/Super Admin/DepartmentSection.html',
        controller: 'departmentSectionController',
        authorize: true
    })
    .when('/Settings', {
        templateUrl: 'View/Super Admin/Setting.html',
        controller: 'settingController',
        authorize: true
    })
    .when('/FinalReport', {
        templateUrl: 'View/Super Admin/FinalReport.html',
        controller: 'finalReportController',
        authorize: true
    })
    .when('/DeletedEmployee', {
        templateUrl: 'View/Super Admin/DeletedEmployeeList.html',
        controller: 'allDeletedEmployeeController',
        authorize: true
    })
    
    .when('/AppraisalInfo', {
        templateUrl: 'View/Super Admin/AppraisalInfo.html',
        controller: 'appraisalInfoController',
        authorize: true
    })

    /* Total Organogram */
    .when('/TotalOrganogram', {
        templateUrl: 'View/Organogram/TotalOrganogram.html',
        controller: 'totalOrganogram',
        authorize: true
    })
    .when('/TotalNumberofEmployee', {
        templateUrl: 'View/TotalEmployee/EmployeeTable.html',
        controller: 'totalEmployee',
        authorize: true
     })

    .when('/SelfAppraisalReport', {
        templateUrl: 'View/Super Admin/SelfAppraisalReport.html',
        controller: 'reportController',
        authorize: true
    })
    
        .when('/JobDescriptionReport', {
        templateUrl: 'View/Super Admin/JobDescriptionReport.html',
            controller: 'jobDescriptionNotSubmitController',
        authorize: true
    })

    .otherwise({
        redirectTo: '/'
    })
}]);

/* Inject the AuthInterceptor Services */
myApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
})

/* directive for Organogram */
myApp.directive('orgChart', function () {
    function link($scope, element, attrs) {
        var chart = new google.visualization.OrgChart(element[0]);
        $scope.$watch('chartData', function (value, oldvalue) {
            if (!value) {
                return;
            }
            var data = google.visualization.arrayToDataTable(value);
            var options = {
                'title': '',
                'allowHtml': true
            }
            chart.draw(data, options);
        })
    }
    return {
        link: link
    };
})

myApp.directive('nvd3RepeatChart', function ($compile) {
    var template = '<nvd3-line-chart data="chartData" id="exampleId" width="800" height="400" showXAxis="true" showYAxis="true" tooltips="true" interactive="true" margin="{left:50,top:50,bottom:50,right:50}" > <svg></svg> </nvd3-line-chart>';
    return {
        restrict: "E",
        rep1ace: true,
        scope: {
            data: '='
        },
        compile: function (element, attrs) {
            scope.chartData = data;
            var x = angular.element('<nvd3-line-chart data="chartData" id="exampleId" width="800" height="400" showXAxis="true" showYAxis="true" tooltips="true" interactive="true" margin="{left:50,top:50,bottom:50,right:50}" > <svg></svg> </nvd3-line-chart>');
            element.append(x);
            $compile(x);
        }
    }
});

myApp.run(function ($rootScope, $location, authService) {
    function getPath(route) {
        if (!!route && typeof (route.originalPath) === "string")
            return "'" + route.originalPath + "'";
        return "[unknown route, using otherwise]";
    }

    $rootScope.$on("$routeChangeStart", function (evt, to, from) {
        if (to.authorize === true) {
            to.resolve = to.resolve || {};
            if (!to.resolve.authorizationResolver) {
                to.resolve.authorizationResolver = function (authService) {
                    return authService.getAuthInfo();

                };
            }
        }

    });

    $rootScope.$on("$routeChangeError", function (evt, to, from, error) {
        $location.path("/login").search("returnTo", to.originalPath);
    });

    // NOT needed in authorization / logging purposes only
    $rootScope.$on("$routeChangeSuccess", function (evt, to, from) {

    });
});


myApp.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
})

/* Global Constant Domain Name for API */

//myApp.constant('serviceBasePath', 'http://localhost:81');
myApp.constant('serviceBasePath', 'http://localhost:51646');

