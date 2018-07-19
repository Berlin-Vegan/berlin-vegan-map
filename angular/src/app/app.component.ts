import { NavigationEnd, Router } from "@angular/router";
import { Component } from "@angular/core";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/pairwise";

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {

    static previousUrl = "";

    constructor(router: Router) {
        router.events
            .filter(event => event instanceof NavigationEnd)
            .pairwise()
            .subscribe((pair: any) => {
                AppComponent.previousUrl = pair[0].url;
            });
    }
}
