import { Component } from "@angular/core";

import { I18nService } from "../i18n.service";
import { environment } from "../../environments/environment";

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: [ "./about.component.scss" ],
})
export class AboutComponent {

    constructor(private readonly i18nService: I18nService) { }

    readonly i18n = this.i18nService.getI18n();
    readonly production = environment.production;
    readonly versionInfo = environment.versionInfo;

    get gitHubCommitUrl(): string {
        const vi = this.versionInfo;
        const baseUrl = vi.repositoryUrl.substring(0, vi.repositoryUrl.length  - 4); // Remove ".git"
        const sha1 = vi.gitDescription.hash.substring(1); // Remove "g"
        return `${baseUrl}/commit/${sha1}`;
    }
}
