import { NavigationEnd, Router } from "@angular/router";
import { Component } from "@angular/core";
import { filter, pairwise } from "rxjs/operators";

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {

    static previousUrl = "";

    constructor(router: Router) {
        router.events.pipe(
            filter((event: Event) => event instanceof NavigationEnd),
            pairwise(),
        ).subscribe((pair: any) => {
            AppComponent.previousUrl = pair[0].url;
        });
    }
}
