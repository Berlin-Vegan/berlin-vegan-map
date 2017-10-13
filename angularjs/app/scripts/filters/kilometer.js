app.filter('kilometer', function(numberFilter, I18nService) {
    var nbsp = "\xa0"; // Non-breaking space
    return function(number) {
        var numberString = numberFilter(number, 1);
        return numberString ? I18nService.formatNumberString(numberString) + nbsp + "km" : undefined;
    };
});
