myApp.factory('errorService', function () {
    var fac = {};
    fac.geApiError = function (errorResponse) {
        var errors = [];
        for (var key in errorResponse.ModelState) {
            for (var i = 0; i < errorResponse.ModelState[key].length; i++) {
                errors.push(errorResponse.ModelState[key][i]);
            }
        }
        return errors;
    }
    return fac;
})