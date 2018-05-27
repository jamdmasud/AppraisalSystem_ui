myApp.filter('multilineText', function () {

    return function (text) {

        if (text == '')
            return '  ';
        else {
            return text;
        }
    }
});