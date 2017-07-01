var global_language;

if (location.href.indexOf("lang=") !== -1) {
    global_language = location.href.split("lang=")[1];
} else if (localStorage) {
    global_language = localStorage.getItem("lang") || "de";
} else {
    var prefLang = getPreferredSupportedLanguage();
    global_language = prefLang || "de";
}

var global_region = (global_language === "en") ? "us" : "de";

function getPreferredSupportedLanguage() {
    var preferredLanguages = getPreferredLanguages();
    for (var i = 0; i < preferredLanguages.length; i++) {
        var lang = preferredLanguages[i];
        if (lang === "en" || lang === "de") {
            return lang;
        }
    }
    return null;
}

function getPreferredLanguages() {
    var preferredLanguages;
    if (navigator.languages !== undefined) {
        // Firefox, Chrome, Opera
        preferredLanguages = navigator.languages;
    } else if (navigator.browserLanguage !== undefined) {
        // IE11
        preferredLanguages = [navigator.browserLanguage];
    } else {
        preferredLanguages = [];
    }
    return preferredLanguages.map(
        function(it) {
            // Remove optional region
            return it.indexOf("-") !== -1 ? it.split("-")[0] : it;
        }
    );
}
