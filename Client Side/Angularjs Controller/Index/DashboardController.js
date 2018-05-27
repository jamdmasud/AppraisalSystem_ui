myApp.controller('dashboard', ['$scope', 'AdmindataServices', function ($scope, AdmindataServices) {

    $scope.PieChart = function (data) {
        var myJson = {
            globals: {
                shadow: false,
                fontFamily: "Verdana",
                fontWeight: "50"
            },
            type: "pie",
            backgroundColor: "#fff",

            legend: {
                layout: "x5",
                position: "0px",
                borderColor: "transparent",
                marker: {
                    borderRadius: 15,
                    borderColor: "transparent"
                }
            },
            tooltip: {
                text: "%v person"
            },
            plot: {
                refAngle: "90",
                borderWidth: "0px",
                valueBox: {
                    placement: "in",
                    text: "%npv %",
                    fontSize: "15px",
                    textAlpha: 1,
                }
            },
            series: [{
                text: "Unsubmited",
                values: [data.unSumited],
                backgroundColor: "#e80417 #600910",
            }, {
                text: "Submited",
                values: [data.sumited],
                backgroundColor: "#1d6d09 #69d84e"
            }]
        };

        return myJson;
    }


}])