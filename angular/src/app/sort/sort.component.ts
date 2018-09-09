import { Component, EventEmitter, Input, Output, Inject } from "@angular/core";

import { I18N } from "../i18n-provider";
import { SortOrder } from "../model/sort-order";

@Component({
    selector: "app-sort",
    templateUrl: "./sort.component.html",
})
export class SortComponent {

    constructor(@Inject(I18N) readonly i18n: any) { }

    @Input() isDistanceEnabled: boolean;
    @Input() sortOrder: SortOrder = "name";
    @Output() readonly sortOrderChange = new EventEmitter<SortOrder>();
    id = Math.random().toString();
}
