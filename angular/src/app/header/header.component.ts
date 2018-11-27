import { Component, EventEmitter, Inject, Input, Output } from "@angular/core";
import { Router } from "@angular/router";

import { ConfigurationService } from "../configuration.service";
import { I18N } from "../i18n-provider";
import { LocalStorageService } from "../local-storage.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: [ "./header.component.scss" ],
})
export class HeaderComponent {

    constructor(
        @Inject(I18N) readonly i18n: any,
        readonly router: Router,
        readonly localStorageService: LocalStorageService,
        private readonly configurationService: ConfigurationService,
    ) { }

    @Input() searchButtonIsDisabled = true;
    @Input() fullMapViewButtonIsDisabled = true;
    @Output() readonly searchClick = new EventEmitter<void>();
    @Output() readonly fullMapViewClick = new EventEmitter<void>();

    readonly language = this.localStorageService.getLanguage();

    readonly paths = [
        { name: "gastro", faClass: "fas fa-utensils" },
        { name: "shopping", faClass: "fas fa-shopping-cart" },
        { name: "settings", faClass: "fas fa-cog" },
        { name: "about", faClass: "fas fa-info-circle" },
    ];

    readonly links = [
        {
            name: "nativeApp",
            faClass: "fas fa-mobile-alt",
            href: "https://www.berlin-vegan.de/bv-guide/"
        },
        {
            name: "reportNewLocation",
            faClass: "fas fa-edit",
            href: "https://data.berlin-vegan.de/gastro-submit/"
        },
        {
            name: "reportProblem",
            faClass: "fas fa-envelope",
            href: "mailto:karte@berlin-vegan.de"
        },
    ];

    get pathName(): string {
        return this.router.url.replace("/", "");
    }

    get hasMobileSize(): boolean {
        return this.configurationService.hasMobileSize();
    }
}
