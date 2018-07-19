import { Injectable } from "@angular/core";
import { Settings } from "./model/settings";

const settingsKey = "berlin-vegan-map.settings";

@Injectable()
export class SettingsService {

    getSettings(): Settings {
        const settingsJson = localStorage.getItem(settingsKey);
        return settingsJson ? new Settings(JSON.parse(settingsJson)) : new Settings();
    }

    saveSettings(settings: Settings) {
        localStorage.setItem(settingsKey, JSON.stringify(settings));
    }
}
