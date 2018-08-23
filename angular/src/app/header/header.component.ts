import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";

import { I18nService } from "../i18n.service";
import { LocalStorageService } from "../local-storage.service";
import { ConfigurationService } from "../configuration.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: [ "./header.component.scss" ],
})
export class HeaderComponent {

    constructor(
        readonly router: Router,
        readonly localStorageService: LocalStorageService,
        private readonly configurationService: ConfigurationService,
        private readonly i18nService: I18nService,
    ) { }

    @Input() searchButtonIsDisabled = true;
    @Input() fullMapViewButtonIsDisabled = true;
    @Output() readonly searchClick = new EventEmitter<void>();
    @Output() readonly fullMapViewClick = new EventEmitter<void>();

    readonly i18n = this.i18nService.getI18n();
    readonly language = this.localStorageService.getLanguage();

    readonly paths = [
        { name: "gastro", faClass: "fas fa-utensils" },
        { name: "shopping", faClass: "fas fa-shopping-cart" },
        { name: "settings", faClass: "fas fa-cog" },
        { name: "about", faClass: "fas fa-info-circle" },
    ];

    get pathName(): string {
        return this.router.url.replace("/", "");
    }

    // TODO: Refactor (duplicated in MainComponent)
    get hasMobileSize(): boolean {
        return !window.matchMedia(this.configurationService.mediaQueries["min-width-1"]).matches;
    }
}
