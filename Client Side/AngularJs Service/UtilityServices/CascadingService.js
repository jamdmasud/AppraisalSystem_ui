myApp.factory("Cascading", ['$filter',
    function ($filter) {

        var service = {};

        // Dummy Data
        var Position = [
            { "id": 1, "position": "Manager" },
            { "id": 2, "position": "IT" },
            { "id": 3, "position": "Junior Officer" },
            { "id": 4, "position": "Senior Officer" },
            { "id": 5, "position": "General Manager" },
            { "id": 6, "position": "Assistant Manager" },
        ];

        var Department = [
            { "id": 1, "department": "Production" },
            { "id": 2, "department": "Procurement" },
            { "id": 3, "department": "Human Resource" },
            { "id": 4, "department": "Dying" },
            { "id": 5, "department": "Color and Technical" },
            { "id": 6, "department": "QC" },
        ];

        var Section = [
            { "Id": 1, "section": "Dying", "departmentId": 1 },
            { "Id": 2, "section": "Febric", "departmentId": 1 },
            { "Id": 3, "section": "Color", "departmentId": 1 },
            { "Id": 4, "section": "Washing", "departmentId": 2 },
            { "Id": 5, "section": "Dying", "departmentId": 2 },
            { "Id": 6, "section": "Merchandizing", "departmentId": 2 },
            { "Id": 7, "section": "amdin", "departmentId": 3 },
            { "Id": 8, "section": "compliance", "departmentId": 3 },
            { "Id": 9, "section": "HR", "departmentId": 3 },
            { "Id": 10, "section": "Febric", "departmentId": 4 },
            { "Id": 11, "section": "Washing", "departmentId": 4 },
            { "Id": 12, "section": "Tech", "departmentId": 5 },
            { "Id": 13, "section": "Embrodary", "departmentId": 5 },
            { "Id": 14, "section": "IT", "departmentId": 5 },
            { "Id": 15, "section": "Account", "departmentId": 6 },
            { "Id": 16, "section": "Quaity Manager", "departmentId": 6 },
        ];

        // Services
        service.getPosition = function () {
            return Position;
        };

        service.getDepartment = function () {
            return Department;
        };

        service.getDepartmentSection = function (departmentId) {
            var items = ($filter('filter')(Section, { departmentId: departmentId }));
            return items;
        };

        return service;
    }]);