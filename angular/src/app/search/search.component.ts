import { Component, EventEmitter, Output } from "@angular/core";

import { ConfigurationService } from "../configuration.service";
import { I18nService } from "../i18n.service";
import { GastroQuery } from "../model/gastro-query";
import { GastroTag, getGastroTags } from "../model/gastro-tag";
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

    @Output() readonly queryChange = new EventEmitter<GastroQuery | ShoppingQuery>();
    @Output() readonly coordinatesChange = new EventEmitter<Coordinates | null>();
    @Output() readonly coordinatesHighlightRequest = new EventEmitter<void>();

    readonly i18n = this.i18nService.getI18n();
    readonly veganCategories = getVeganCategories();
    tags: (GastroTag | ShoppingTag)[];
    query: GastroQuery | ShoppingQuery;
    isGastro: boolean;

    init(query: GastroQuery | ShoppingQuery) {
        if (query instanceof GastroQuery) {
            this.tags = getGastroTags();
            this.isGastro = true;
        } else {
            this.tags = getShoppingTags();
            this.isGastro = false;
        }
        this.query = query;
    }

    onQueryChange() {
        this.queryChange.emit(this.query);
    }

    onCoordinatesChange(coordinates: Coordinates | null) {
        if (!coordinates) {
            this.query.distance.enabled = false;
        }
        this.query.distance.coordinates = coordinates;
        this.queryChange.emit(this.query);
        this.coordinatesChange.emit(coordinates);
    }
}
