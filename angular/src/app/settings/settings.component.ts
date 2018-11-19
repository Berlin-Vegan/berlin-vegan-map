import { Location } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";

import { I18N } from "../i18n-provider";
import { isLocalStorageAvailable } from "../local-storage-wrapper";
import { LocalStorageService } from "../local-storage.service";
import { Settings } from "../model/settings";

import { AppComponent } from "./../app.component";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
})
export class SettingsComponent {

    constructor(
        @Inject(I18N) readonly i18n: any,
        readonly localStorageService: LocalStorageService,
        private readonly router: Router,
        private readonly location: Location,
    ) {}

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

    onSettingsChange() {
        this.localStorageService.saveSettings();
    }

    onRememberLastQueryChange() {
        if (!this.localStorageService.settings.rememberLastQuery) {
            if (confirm(this.i18n.settings.deleteQueriesConfirmation)) {
                this.localStorageService.deleteQueries();
            }
        }
    }

    onResetButtonClick() {
        Object.assign(this.localStorageService.settings, new Settings());
        this.localStorageService.saveSettings();
    }
}
