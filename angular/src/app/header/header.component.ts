import { Component, EventEmitter, Inject, Input, Output } from "@angular/core";
import { Router } from "@angular/router";

import { ConfigurationService } from "../config/configuration.service";
import { defaultConfig as config } from "../config/default-config";
import { I18N } from "../i18n-provider";
import { LocalStorageService } from "../local-storage.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {

    constructor(
        @Inject(I18N) readonly i18n: any,
        readonly router: Router,
        readonly localStorageService: LocalStorageService,
        readonly configurationService: ConfigurationService,
    ) { }

    @Input() searchButtonIsDisabled = true;
    @Input() fullMapViewButtonIsDisabled = true;
    @Output() readonly searchClick = new EventEmitter<void>();
    @Output() readonly fullMapViewClick = new EventEmitter<void>();

    readonly language = this.localStorageService.getLanguage();

    readonly paths = [
        { name: "gastro", faClass: "fas fa-utensils" },
        { name: "shops", faClass: "fas fa-shopping-cart" },
        { name: "settings", faClass: "fas fa-cog" },
        { name: "about", faClass: "fas fa-info-circle" },
    ].filter(it => config.enableShops || it.name !== "shops") as { name: string, faClass: string }[];

    readonly links = [
        {
            name: "nativeApp",
            faClass: "fas fa-mobile-alt",
            href: this.configurationService.nativeAppUrl
        },
        {
            name: "reportNewLocation",
            faClass: "fas fa-edit",
            href: this.configurationService.reportNewLocationUrl
        },
        {
            name: "reportProblem",
            faClass: "fas fa-envelope",
            href: "mailto:" + this.configurationService.reportProblemEmail
        },
    ].filter(it => !!it.href) as { name: string, faClass: string, href: string }[];

    get pathName(): string {
        return this.router.url.replace("/", "");
    }

    get hasMobileSize(): boolean {
        return this.configurationService.hasMobileSize();
    }
}
