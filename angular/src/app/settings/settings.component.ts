import { Component, Inject } from "@angular/core";

import { I18N } from "../i18n-provider";
import { isLocalStorageAvailable } from "../local-storage-wrapper";
import { LocalStorageService } from "../local-storage.service";
import { Settings } from "../model/settings";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
})
export class SettingsComponent {

    constructor(
        @Inject(I18N) readonly i18n: any,
        readonly localStorageService: LocalStorageService,
    ) {}

    get isLocalStorageAvailable(): boolean {
        return isLocalStorageAvailable();
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
