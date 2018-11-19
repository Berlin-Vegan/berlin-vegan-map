import { Component, Inject, Input } from "@angular/core";

import { I18N } from "../i18n-provider";

@Component({
    selector: "app-statistics",
    templateUrl: "./statistics.component.html",
    styleUrls: [ "./statistics.component.scss" ],
})
export class StatisticsComponent {

    constructor(@Inject(I18N) readonly i18n: any) { }

    @Input() allLocationsCount: number;
    @Input() filteredLocationsCount: number;
}
