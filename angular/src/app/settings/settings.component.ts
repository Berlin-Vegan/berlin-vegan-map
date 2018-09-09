import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";

import { AppComponent } from "./../app.component";
import { I18N } from "../i18n-provider";
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
