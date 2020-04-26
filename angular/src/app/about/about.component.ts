import { Component, Inject } from "@angular/core";

import { environment } from "../../environments/environment";
import { versionInfo } from "../../environments/version-info";
import { I18N } from "../i18n-provider";

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: [ "./about.component.scss" ],
})
export class AboutComponent {

    constructor(@Inject(I18N) readonly i18n: any) { }

    readonly production = environment.production;
    readonly versionInfo = versionInfo;

    get gitHubCommitUrl(): string {
        const vi = this.versionInfo;
        const baseUrl = vi.repositoryUrl.substring(0, vi.repositoryUrl.length  - 4); // Remove ".git"
        const sha1 = vi.gitDescription.hash.substring(1); // Remove "g"
        return `${baseUrl}/commit/${sha1}`;
    }
}
