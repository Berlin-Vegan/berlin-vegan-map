import { Component } from "@angular/core";
import { I18nService } from "../i18n.service";
import { Location } from "@angular/common";
import { LocalStorageService } from "../local-storage.service";
import { isLocalStorageAvailable } from "../local-storage-wrapper";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
})
export class SettingsComponent {

    constructor(
        readonly localStorageService: LocalStorageService,
        private readonly i18nService: I18nService,
        private readonly location: Location
    ) {}

    readonly i18n = this.i18nService.getI18n();

    get isLocalStorageAvailable(): boolean {
        return isLocalStorageAvailable();
    }

    onBackButtonClick() {
        this.location.back();
    }

    onQueryChange() {
        this.localStorageService.saveSettings();
    }
}