import { Injectable } from "@angular/core";
import { Settings } from "./model/settings";
import * as localStorageWrapper from "./local-storage-wrapper";

const settingsKey = "berlin-vegan-map.settings";

@Injectable()
export class LocalStorageService {

    private _settings: Settings | null;

    get settings(): Settings {
        if (!this._settings) {
            this._settings = this.loadSettings();
        }
        return this._settings;
    }

    private loadSettings(): Settings {
        return new Settings(localStorageWrapper.getObject(settingsKey));
    }

    saveSettings() {
        localStorageWrapper.setObject(settingsKey, this.settings);
    }
}
