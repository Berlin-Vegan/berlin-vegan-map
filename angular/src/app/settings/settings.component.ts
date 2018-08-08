import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AppComponent } from "./../app.component";
import { I18nService } from "../i18n.service";
import { Location } from "@angular/common";
import { LocalStorageService } from "../local-storage.service";
import { isLocalStorageAvailable } from "../local-storage-wrapper";
import { Settings } from "../model/settings";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
})
export class SettingsComponent {

    constructor(
        readonly localStorageService: LocalStorageService,
        private readonly i18nService: I18nService,
        private readonly router: Router,
        private readonly location: Location,
    ) {}

    readonly i18n = this.i18nService.getI18n();

    get isLocalStorageAvailable(): boolean {
        return isLocalStorageAvailable();
    }

    onBackButtonClick() {
        if (AppComponent.previousUrl) {
            this.location.back();
        } else {
            this.router.navigate([""]);
        }
    }

    onQueryChange() {
        if (!this.localStorageService.settings.rememberLastQuery) {
            if (confirm(this.i18n.settings.deleteQueriesConfirmation)) {
                this.localStorageService.deleteQueries();
            }
        }
        this.localStorageService.saveSettings();
    }

    onResetButtonClick() {
        Object.assign(this.localStorageService.settings, new Settings());
        this.localStorageService.saveSettings();
    }
}
