import { Component, EventEmitter, Input, Output, Inject } from "@angular/core";

import { ConfigurationService } from "../configuration.service";
import { I18N } from "../i18n-provider";
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
        @Inject(I18N) readonly i18n: any,
        readonly configurationService: ConfigurationService,
    ) { }

    @Input() query: GastroQuery | ShoppingQuery;
    @Output() readonly queryChange = new EventEmitter<GastroQuery | ShoppingQuery>();
    @Output() readonly manualPlaceHighlightRequest = new EventEmitter<void>();
    @Output() readonly autoPlaceHighlightRequest = new EventEmitter<void>();

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

    get queryAsAny(): any { return this.query; }

    onQueryChange() {
        this.queryChange.emit(this.query);
    }

    onPlaceChange(place: Place | null) {
        this.query.distance.place = place;
        this.queryChange.emit(this.query);
    }
}
