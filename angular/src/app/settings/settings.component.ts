import { Component } from "@angular/core";
import { I18nService } from "../i18n.service";
import { Location } from "@angular/common";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Settings } from "../model/settings";
import { SettingsService } from "../settings.service";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
})
export class SettingsComponent implements OnInit {

    constructor(
        private readonly settingsService: SettingsService,
        private readonly i18nService: I18nService,
        private readonly location: Location
    ) {}

    readonly i18n = this.i18nService.getI18n();
    settings = new Settings();

    ngOnInit(): void {
        this.settings = this.settingsService.getSettings();
    }

    onBackButtonClick() {
        this.location.back();
    }

    onQueryChange() {
        this.settingsService.saveSettings(this.settings);
    }
}
