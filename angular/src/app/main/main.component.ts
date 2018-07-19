import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { GastroLocation } from "../model/gastro-location";
import { GastroQuery } from "../model/gastro-query";
import { ShoppingLocation } from "../model/shopping-location";
import { ShoppingQuery } from "../model/shopping-query";
import { GoogleMapComponent } from "../google-map/google-map.component";
import { I18nService } from "../i18n.service";
import { Location } from "../model/location";
import { LocationService } from "../location.service";
import { ResultsListComponent } from "../results-list/results-list.component";
import { SearchComponent } from "../search/search.component";
import { SearchService } from "../search.service";
import { SortOrder } from "../sort/sort-order";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: [ "./main.component.scss" ],
})
export class MainComponent implements OnInit {

    constructor(
        private readonly route: ActivatedRoute,
        private readonly i18nService: I18nService,
        private readonly locationService: LocationService,
        private readonly searchService: SearchService,
    ) {}

    @ViewChild(SearchComponent) searchComponent: SearchComponent;
    @ViewChild(ResultsListComponent) resultsListComponent: ResultsListComponent;
    @ViewChild(GoogleMapComponent) googleMapComponent: GoogleMapComponent;
    @ViewChild("preSearchDiv") preSearchDiv: ElementRef;

    readonly i18n = this.i18nService.getI18n();
    readonly initialSortOrder = "name";
    sortOrder: SortOrder = this.initialSortOrder;
    allLocations: (GastroLocation | ShoppingLocation)[] = [];
    filteredLocations: (GastroLocation | ShoppingLocation)[] = [];
    query: GastroQuery | ShoppingQuery;
    isGastro: boolean | undefined;
    fullMapView = false;
    coordinates: Coordinates | null = null;
    selectedLocation: Location | null = null;

    get isInfoBoxVisible(): boolean {
        return !!this.selectedLocation;
    }

    ngOnInit() {
        this.route
            .url
            .subscribe(url => {
                const path = url[0].path;
                if (path === "gastro" || path === "shopping") {
                    this.init(path);
                } else {
                    throw new Error("Unexpected path: " + path);
                }
            });
    }

    init(path: "gastro" | "shopping") {
        this.isGastro = (path === "gastro");
        this.query = this.isGastro ? new GastroQuery() : new ShoppingQuery();
        this.searchComponent.init(this.query);
        const locationPromise: Promise<(GastroLocation | ShoppingLocation)[]> =
            this.isGastro ?
            this.locationService.getGastroLocations()
            :
            this.locationService.getShoppingLocations();
        locationPromise
            .then(locations => {
                this.allLocations = locations;
                this.filteredLocations = locations.sort(this.getSortFunction());
                this.googleMapComponent.init(locations);
            });
    }

    onQueryChange(query: GastroQuery | ShoppingQuery) {
        this.query = query;
        this.updateFilteredLocations();
    }

    onSortOrderChange(sortOrder: SortOrder) {
        this.sortOrder = sortOrder;
        this.updateFilteredLocations();
    }

    updateFilteredLocations() {
        this.filteredLocations =
            this.allLocations
                .filter(it => this.searchService.isResult(it, this.query))
                .sort(this.getSortFunction());
    }

    onLocationSelectInResultsList(location: Location) {
        if (!window.matchMedia("(min-width: 568px)").matches) {
            this.enableFullMapView();
        }
        this.googleMapComponent.selectLocation(location);
        this.selectedLocation = location;
    }

    onLocationSelectInGoogleMap(location: Location | null) {
        if (location) {
            this.resultsListComponent.makeVisible(location);
        }
        this.selectedLocation = location;
    }

    scrollSearchIntoView() {
        if (this.fullMapView) {
            this.fullMapView = false;
        }
        setTimeout(() => { this.preSearchDiv.nativeElement.scrollIntoView(); }, 0);
    }

    enableFullMapView() {
        this.fullMapView = true;
        this.googleMapComponent.resize();
    }

    private getSortFunction(): (a: any, b: any) => number {
        switch (this.sortOrder) {
            case "name":
                return (locationA, locationB) =>
                    locationA.name.localeCompare(locationB.name, this.i18nService.getLanguage());
            case "distance":
                return (locationA, locationB) =>
                    this.getDistanceToCoordinates(locationA) - this.getDistanceToCoordinates(locationB);
            default:
                throw new Error("Unexpected value for SortOrder: " + this.sortOrder);
        }
    }

    private getDistanceToCoordinates(location: Location) {
        return this.coordinates ? location.getDistanceToCoordinatesInKm(this.coordinates) : 1;
    }

    onCoordinatesChange(coordinates: Coordinates | null) {
        this.coordinates = coordinates;
    }

    onCoordinatesHighlightRequest() {
        this.googleMapComponent.selectCoordinates();
    }

    onInfoBoxClose() {
        this.selectedLocation = null;
        this.googleMapComponent.selectLocation(null);
    }
}
