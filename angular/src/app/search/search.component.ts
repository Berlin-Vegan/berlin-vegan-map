import { Component, EventEmitter, Inject, Input, Output } from "@angular/core";

import { ConfigurationService } from "../configuration.service";
import { I18N } from "../i18n-provider";
import { GastroQuery } from "../model/gastro-query";
import { GastroTag, getGastroTags } from "../model/gastro-tag";
import { Place } from "../model/place";
import { ShoppingQuery } from "../model/shopping-query";
import { getShoppingTags, ShoppingTag } from "../model/shopping-tag";
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

    get features(): string[] {
        return this.isGastro ? [
            "isNew",
            "_", // Note this.
            "organic",
            "glutenFree",
            "breakfast",
            "brunch",
            "handicappedAccessible",
            "handicappedAccessibleWc",
            "childChair",
            "dog",
            "delivery",
            "catering",
            "wlan",
            "review"
        ] : [
            "isNew",
            "organic",
            "handicappedAccessible",
            "review"
        ];
    }

    // Note that due to variable-width fonts, this method cannot guarantee that the returned text is
    // the one that actually displays with maximum width.
    getLongestFeatureText(even: boolean): string {
        return this.features
            .filter((_, index) => (even && index % 2 === 0) || (!even && index % 2 !== 0))
            .map(it => this.i18n.features[it] as string)
            .sort((a, b) => b.length - a.length)[0];
    }

    get queryAsAny(): any { return this.query; }

    onQueryChange() {
        this.queryChange.emit(this.query);
    }

    onPlaceChange(place: Place | null) {
        this.query.distance.place = place;
        this.queryChange.emit(this.query);
    }

    onQueryTextKeyPress(event: KeyboardEvent) {
        if (event.key === "Enter") {
            event.preventDefault();
            (document.activeElement as HTMLElement).blur();
        }
    }

    // TODO: Move to library
    capitalizeFirstLetter(s: string) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
}
