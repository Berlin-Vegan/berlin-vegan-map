import { Component, Inject, OnInit } from "@angular/core";

import { I18N } from "../../i18n-provider";
import { isLocalStorageAvailable } from "../../local-storage-wrapper";
import { LocalStorageService } from "../../local-storage.service";
import { Settings } from "../../model/settings";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
})
export class SettingsComponent implements OnInit {

    constructor(
        @Inject(I18N) readonly i18n: any,
        readonly localStorageService: LocalStorageService,
    ) { }

    private lastValidMonthsNew: number;

    ngOnInit() {
        this.lastValidMonthsNew = this.localStorageService.settings.monthsNew;
    }

    get isLocalStorageAvailable(): boolean {
        return isLocalStorageAvailable();
    }

    onSettingsChange() {
        if (this.isMonthsNewValid) {
            this.lastValidMonthsNew = this.localStorageService.settings.monthsNew;
            this.localStorageService.saveSettings();
        } else {
            this.localStorageService.settings.monthsNew = this.lastValidMonthsNew;
        }
    }

    private get isMonthsNewValid(): boolean {
        const value = this.localStorageService.settings.monthsNew;
        return value === Math.floor(value) && value > 0;
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
