import { Component, EventEmitter, Input, Output } from "@angular/core";

import { I18nService } from "../i18n.service";
import { SortOrder } from "../model/sort-order";

@Component({
    selector: "app-sort",
    templateUrl: "./sort.component.html",
})
export class SortComponent {

    constructor(private readonly i18nService: I18nService) { }

    @Input() isDistanceEnabled: boolean;
    @Input() sortOrder: SortOrder = "name";
    @Output() readonly sortOrderChange = new EventEmitter<SortOrder>();
    readonly i18n = this.i18nService.getI18n();
    id = Math.random().toString();
}
