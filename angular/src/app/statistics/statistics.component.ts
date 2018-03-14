import { Component, Input, OnInit } from "@angular/core";

import { I18nService } from "../i18n.service";

@Component({
    selector: "app-statistics",
    templateUrl: "./statistics.component.html",
    styleUrls: [ "./statistics.component.scss" ],
})
export class StatisticsComponent {

    constructor(private readonly i18nService: I18nService) { }

    @Input() allLocationsCount: number;
    @Input() filteredLocationsCount: number;
    readonly i18n = this.i18nService.getI18n();
}
