app.filter('kilometer', function(I18nService) {
    var nbsp = "\xa0"; // Non-breaking space
    return function(number) {
        return number ? I18nService.formatNumberString(number.toFixed(1)) + nbsp + "km" : undefined;
    };
});
