myApp.factory("dataService", ['$http', '$filter', function ($http, $filter) {
    var services = [];

    var group = [{ id: 0, value: "All" }, { id: 1, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 3 }, { id: 4, value: 4 }, { id: 5, value: 5 }, { id: 6, value: 6 }, { id: 7, value: 7 }, { id: 8, value: 8 }, { id: 9, value: 9 }, { id: 10, value: 10 }];

    services.getAllData = function () {
        return $http.get('https://jsonplaceholder.typicode.com/albums');
    }

    services.getSpecificData = function (data) {
        return $http.get('https://jsonplaceholder.typicode.com/albums/' + data)
    }

    services.getGroup = function () {
        return group;
    }

    return services;
}]);