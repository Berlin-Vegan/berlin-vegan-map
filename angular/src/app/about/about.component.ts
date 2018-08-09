import { Component } from "@angular/core";

import { I18nService } from "../i18n.service";
import { environment } from "../../environments/environment";

@Component({
    selector: "app-about",
    templateUrl: "about.component.html",
})
export class AboutComponent {

    constructor(private readonly i18nService: I18nService) { }

    readonly i18n = this.i18nService.getI18n();
    readonly production = environment.production;
    readonly versionInfo = environment.versionInfo;
}
