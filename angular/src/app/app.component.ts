import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";

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
        configurationService: ConfigurationService,
        localStorageService: LocalStorageService
    ) {
        const trackingIds = configurationService.googleAnalyticsTrackingIds;
        if (gtag) {
            gtag("config", trackingIds.website, {
                "send_page_view": false,
            });
            gtag("config", trackingIds.map, {
                "send_page_view": false,
                "custom_map": { "dimension1": "appLanguage" }
            });

            // Setup a listener to track "Add to Homescreen?" events;
            window.addEventListener("beforeinstallprompt", (e: any) => {
                e.userChoice.then((choiceResult: any) => {
                    gtag("event", "installprompt", {
                        "send_to": trackingIds.map,
                        "event_label": choiceResult.outcome,
                        "appLanguage": localStorageService.getLanguage(),
                    });
                });
            });
        }

        router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event => event as NavigationEnd)
        ).subscribe(event => {
            if (gtag) {
                const url = getUrl(event);
                gtag("event", "page_view", {
                    "send_to": trackingIds.website,
                    "page_path": url,
                });
                gtag("event", "page_view", {
                    "send_to": trackingIds.map,
                    "page_path": url,
                    "appLanguage": localStorageService.getLanguage(),
                });
            }
        });
    }
}

function getUrl(event: NavigationEnd): string {
    return normalizeId(event.urlAfterRedirects);
}

function normalizeId(url: string): string {
    const matches = /(gastro|shops)\/(.+)/.exec(url);
    return matches ? url.replace(matches[2], "{id}") : url;
}
