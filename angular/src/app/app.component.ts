import { PlatformLocation } from "@angular/common";
import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";

import { ConfigurationService } from "./configuration.service";
import { LocalStorageService } from "./local-storage.service";

declare var gtag: any;

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {

    constructor(
        router: Router,
        platformLocation: PlatformLocation,
        configurationService: ConfigurationService,
        localStorageService: LocalStorageService
    ) {
        const trackingIds = configurationService.googleAnalyticsTrackingIds;
        const standalone = window.matchMedia("(display-mode: standalone)").matches
            || (window.navigator as any).standalone === true; // Safari

        if (gtag) {
            gtag("config", trackingIds.website, {
                "send_page_view": false,
            });
            gtag("config", trackingIds.map, {
                "send_page_view": false,
                "custom_map": {
                    "dimension1": "appLanguage",
                    "dimension2": "standalone"
                }
            });

            window.addEventListener("beforeinstallprompt", () => {
                gtag("event", "beforeinstallprompt", {
                    "send_to": trackingIds.map,
                    "appLanguage": localStorageService.getLanguage(),
                    "standalone": standalone + ""
                });
            });
            window.addEventListener("appinstalled", () => {
                gtag("event", "appinstalled", {
                    "send_to": trackingIds.map,
                    "appLanguage": localStorageService.getLanguage(),
                    "standalone": standalone + ""
                });
            });
        }

        router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            if (gtag) {
                const url = normalizeId(platformLocation.pathname);
                gtag("event", "page_view", {
                    "send_to": trackingIds.website,
                    "page_path": url,
                });
                gtag("event", "page_view", {
                    "send_to": trackingIds.map,
                    "page_path": url,
                    "appLanguage": localStorageService.getLanguage(),
                    "standalone": standalone + ""
                });
            }
        });
    }
}

function normalizeId(url: string): string {
    const matches = /(gastro|shops)\/(.+)/.exec(url);
    return matches ? url.replace(matches[2], "{id}") : url;
}
