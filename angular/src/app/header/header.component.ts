import { Component, EventEmitter, Input, Output, Inject } from "@angular/core";
import { Router } from "@angular/router";

import { I18N } from "../i18n-provider";
import { LocalStorageService } from "../local-storage.service";
import { ConfigurationService } from "../configuration.service";

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

    get pathName(): string {
        return this.router.url.replace("/", "");
    }

    // TODO: Refactor (duplicated in MainComponent)
    get hasMobileSize(): boolean {
        return !window.matchMedia(this.configurationService.mediaQueries["min-width-1"]).matches;
    }
}
