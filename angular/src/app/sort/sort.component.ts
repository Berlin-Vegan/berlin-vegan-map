import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { I18nService } from "../i18n.service";
import { SortOrder } from "./sort-order";

@Component({
    selector: "app-sort",
    templateUrl: "./sort.component.html",
})
export class SortComponent implements OnInit {

    constructor(private readonly i18nService: I18nService) { }

    @Input() initialSortOrder: SortOrder;

    @Input() set isDistanceEnabled(isDistanceEnabled: boolean) {
        this._isDistanceEnabled = isDistanceEnabled;
        if (!isDistanceEnabled && this.sortOrder !== "name") {
            this.sortOrder = "name";
            this.sortOrderChange.emit("name");
        }
    }

    get isDistanceEnabled(): boolean {
        return this._isDistanceEnabled;
    }

    private _isDistanceEnabled: boolean;

    @Output() readonly sortOrderChange = new EventEmitter<SortOrder>();

    readonly i18n = this.i18nService.getI18n();

    sortOrder: SortOrder;

    ngOnInit() {
        this.sortOrder = this.initialSortOrder;
    }
}
