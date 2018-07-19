import { Component } from "@angular/core";
import { I18nService } from "../i18n.service";
import { Location } from "@angular/common";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Settings } from "../model/settings";
import { LocalStorageService } from "../local-storage.service";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
})
export class SettingsComponent implements OnInit {

    constructor(
        private readonly localStorageService: LocalStorageService,
        private readonly i18nService: I18nService,
        private readonly location: Location
    ) {}

    readonly i18n = this.i18nService.getI18n();
    settings: Settings;

    ngOnInit(): void {
        this.settings = this.localStorageService.settings;
    }

    onBackButtonClick() {
        this.location.back();
    }

    onQueryChange() {
        this.localStorageService.saveSettings(this.settings);
    }
}
