import { Injectable } from "@angular/core";

import { GastroQuery } from "./model/gastro-query";
import { keys } from "../local-storage-keys";
import { Language } from "../language";
import { Settings } from "./model/settings";
import { ShoppingQuery } from "./model/shopping-query";
import * as localStorageWrapper from "./local-storage-wrapper";

declare var global_language: Language;

@Injectable()
export class LocalStorageService {

    private _settings: Settings | null = null;
    private _gastroQuery: GastroQuery | null = null;
    private _shoppingQuery: ShoppingQuery | null = null;

    get settings(): Settings {
        if (!this._settings) {
            this._settings = this.loadSettings();
        }
        return this._settings;
    }

    private loadSettings(): Settings {
        return new Settings(localStorageWrapper.getObject(keys.settings));
    }

    saveSettings() {
        this.settings.storedAt = new Date();
        localStorageWrapper.setObject(keys.settings, this.settings);
    }

    get gastroQuery(): GastroQuery {
        if (!this._gastroQuery) {
            this._gastroQuery = this.loadGastroQuery();
        }
        return this._gastroQuery;
    }

    private loadGastroQuery(): GastroQuery {
        return new GastroQuery(localStorageWrapper.getObject(keys.gastroQuery));
    }

    saveGastroQuery() {
        this.gastroQuery.storedAt = new Date();
        localStorageWrapper.setObject(keys.gastroQuery, this.gastroQuery);
    }

    get shoppingQuery(): ShoppingQuery {
        if (!this._shoppingQuery) {
            this._shoppingQuery = this.loadShoppingQuery();
        }
        return this._shoppingQuery;
    }

    private loadShoppingQuery(): ShoppingQuery {
        return new ShoppingQuery(localStorageWrapper.getObject(keys.shoppingQuery));
    }

    saveShoppingQuery() {
        this.shoppingQuery.storedAt = new Date();
        localStorageWrapper.setObject(keys.shoppingQuery, this.shoppingQuery);
    }

    deleteQueries() {
        this._gastroQuery = null;
        this._shoppingQuery = null;
        localStorageWrapper.removeItem(keys.gastroQuery);
        localStorageWrapper.removeItem(keys.shoppingQuery);
    }

    setLanguage(language: Language) {
        if (localStorageWrapper.isLocalStorageAvailable) {
            localStorageWrapper.setItem(keys.language, language);
            // Clear search parameters: (location.search = "" leaves question mark in some browsers.)
            location.href = location.href.split("?")[0];
        } else {
            location.search = "?lang=" + language;
        }
    }

    getLanguage(): Language {
        return global_language;
    }
}
