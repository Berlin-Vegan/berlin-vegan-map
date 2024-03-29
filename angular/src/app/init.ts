import { keys } from "./local-storage-keys";
import { Language } from "./model/language";

export { };

declare var global_language: Language;

if (window.location.hostname !== "localhost" && window.location.protocol === "http:") {
    redirectToHttps();
} else {
    global_language = getLanguage();
    document.documentElement!.setAttribute("lang", global_language);
    appendScript(
        "https://maps.googleapis.com/maps/api/js?"
        + "v=3"
        + "&libraries=places"
        + "&key=AIzaSyBTt9G9li1KDLuTn8Czv-m57Ehc6Hl-Hrg"
        + "&language=" + global_language
        + "&region=" + getRegion(global_language)
    );
}

function redirectToHttps() {
    const httpsUrl = location.href.replace(/http:/, "https:");
    window.location.replace(httpsUrl);
}

function getLanguage(): Language {
    let language: string;
    const languageFromUrl = new URLSearchParams(window.location.search).get("lang");

    if (languageFromUrl) {
        language = languageFromUrl;
    } else if (localStorage) {
        language = localStorage.getItem(keys.language) ?? "de";
    } else {
        const prefLang = getPreferredLanguages().find(it => it === "en" || it === "de");
        language = prefLang ?? "de";
    }

    if (language === "en" || language === "de") {
        return language;
    } else {
        alert(`Illegal value '${language}' for language. Expected 'en' or 'de'. Defaulting to 'en'.`);
        return "en";
    }
}

function getPreferredLanguages() {
    let preferredLanguages: ReadonlyArray<string>;
    if (navigator.languages !== undefined) {
        // Firefox, Chrome, Opera
        preferredLanguages = navigator.languages;
    } else if ((navigator as any).browserLanguage !== undefined) {
        // IE11
        preferredLanguages = [(navigator as any).browserLanguage];
    } else {
        preferredLanguages = [];
    }
    return preferredLanguages.map(it => it.split("-")[0]); // Remove optional region
}

function getRegion(language: Language) {
    return language === "en" ? "us" : "de";
}

function appendScript(url: string) {
    const script = document.createElement("script");
    script.src = url;
    script.async = false;
    document.head!.appendChild(script);
}
