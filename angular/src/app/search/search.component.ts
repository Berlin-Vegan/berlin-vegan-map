import { Component, EventEmitter, Input, Output } from "@angular/core";

import { ConfigurationService } from "../configuration.service";
import { I18nService } from "../i18n.service";
import { GastroQuery } from "../model/gastro-query";
import { GastroTag, getGastroTags } from "../model/gastro-tag";
import { Place } from "../model/place";
import { ShoppingQuery } from "../model/shopping-query";
import { ShoppingTag, getShoppingTags } from "../model/shopping-tag";
import { getVeganCategories } from "../model/vegan-category";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: [ "./search.component.scss" ],
})
export class SearchComponent {

    constructor(
        readonly configurationService: ConfigurationService,
        private readonly i18nService: I18nService,
    ) { }

    @Input() query: GastroQuery | ShoppingQuery;
    @Output() readonly queryChange = new EventEmitter<GastroQuery | ShoppingQuery>();
    @Output() readonly manualPlaceHighlightRequest = new EventEmitter<void>();
    @Output() readonly autoPlaceHighlightRequest = new EventEmitter<void>();

    readonly i18n = this.i18nService.getI18n();
    readonly veganCategories = getVeganCategories();

    get tags(): (GastroTag | ShoppingTag)[] {
        return this.query instanceof GastroQuery ? getGastroTags() : getShoppingTags();
    }

    // In template, there is no instanceof.
    get isGastro(): boolean {
        return this.query instanceof GastroQuery;
    }

    get featureList1(): string[] {
        return this.isGastro ?
            ["organic", "breakfast", "dog", "handicappedAccessible", "delivery", "wlan"]
            :
            ["organic", "handicappedAccessible"];
    }

    get featureList2(): string[] {
        return this.isGastro ?
            ["glutenFree", "brunch", "childChair", "handicappedAccessibleWc", "catering", "review"]
            :
            ["review"];
    }

    onQueryChange() {
        this.queryChange.emit(this.query);
    }

    onPlaceChange(place: Place | null) {
        if (!this.query.distance.place && place) {
            this.query.sortOrder = "distance";
        }
        if (!place) {
            this.query.distance.enabled = false;
        }
        this.query.distance.place = place;
        this.queryChange.emit(this.query);
    }
}
