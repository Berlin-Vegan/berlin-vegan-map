import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";

declare var gtag: any;
const websiteGaTrackingId = "UA-1323925-1";

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {

    constructor(router: Router) {
        router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event => event as NavigationEnd)
        ).subscribe(event => {
            if (gtag) {
                gtag("config", websiteGaTrackingId, { "page_path": event.urlAfterRedirects });
            }
        });
    }
}
