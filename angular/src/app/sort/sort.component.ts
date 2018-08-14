import { Component, EventEmitter, Input, Output } from "@angular/core";

import { I18nService } from "../i18n.service";
import { SortOrder } from "../model/sort-order";

@Component({
    selector: "app-sort",
    templateUrl: "./sort.component.html",
})
export class SortComponent {

    constructor(private readonly i18nService: I18nService) { }

    @Input() set isDistanceEnabled(isDistanceEnabled: boolean) {
        this._isDistanceEnabled = isDistanceEnabled;
        if (!isDistanceEnabled && this.sortOrder !== "name") {
            this.sortOrderChange.emit("name");
        }
    }
    get isDistanceEnabled(): boolean { return this._isDistanceEnabled; }
    private _isDistanceEnabled: boolean;

    @Input() sortOrder: SortOrder = "name";

    @Output() readonly sortOrderChange = new EventEmitter<SortOrder>();

    readonly i18n = this.i18nService.getI18n();
    id = Math.random().toString();
}
