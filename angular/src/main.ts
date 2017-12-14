import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

declare var google: any;

const interval = setInterval(
    () => {
        if (typeof google === "object") {

            if (environment.production) {
                enableProdMode();
            }

            platformBrowserDynamic().bootstrapModule(AppModule)
                .catch(err => console.log(err));

            clearInterval(interval);
        }
    },
    20
);
