import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { ConfigurationService } from "../configuration.service";
import { I18nService } from "../i18n.service";
import { LocationService } from "../location.service";
import { Tag } from "../tag";
import { VeganCategory } from "../vegan-category";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
})
export class SearchComponent implements OnInit {

    constructor(
        readonly configurationService: ConfigurationService,
        private readonly i18nService: I18nService,
        private readonly locationService: LocationService,
    ) { }

    @Input() initialQuery; // TODO: Type
    @Output() readonly queryChange = new EventEmitter<any>(); // TODO: Type
    @Output() readonly geopositionChange = new EventEmitter<any>(); // TODO: Type
    @Output() readonly geopositionHighlightRequest = new EventEmitter<any>(); // TODO: Type

    readonly i18n = this.i18nService.getI18n();
    readonly veganCategories = this.locationService.getSortedVeganCategories();
    readonly tags: Tag[]= this.locationService.getSortedTags();
    query: any; // TODO: Type

    ngOnInit() {
        this.query = this.initialQuery;
    }

    onQueryChange() {
        this.queryChange.emit(this.query);
    }

    onGeopositionChange(geoposition) {
        if (!geoposition) {
            this.query.distance.enabled = false;
        }
        this.query.distance.position = geoposition;
        this.queryChange.emit(this.query);
        this.geopositionChange.emit(geoposition);
    }
}
