import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import "./init";

declare var google: any;

const interval = setInterval(
    () => {
        if (typeof google === "object") {

            if (environment.production) {
                enableProdMode();
            }

            platformBrowserDynamic().bootstrapModule(AppModule, {
                // See https://github.com/angular/angular-cli/issues/10859
                // TODO: Check later if we still need this:
                preserveWhitespaces: true
            })
            .catch(err => console.log(err));

            clearInterval(interval);
        }
    },
    20
);
