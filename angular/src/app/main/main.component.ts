import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavigatorUtil } from "@marco-eckstein/js-utils";

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
import { LocalStorageService } from "../local-storage.service";
import { ConfigurationService } from "../configuration.service";

let module_firstConstruction = true;
let module_fullMapView: boolean;

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
        private readonly configurationService: ConfigurationService,
        private readonly localStorageService: LocalStorageService,
    ) {
        if (module_firstConstruction) {
            this.fullMapView = this.hasMobileSize;
        }
        module_firstConstruction = false;
    }

    @ViewChild(SearchComponent) searchComponent: SearchComponent;
    @ViewChild(ResultsListComponent) resultsListComponent: ResultsListComponent;
    @ViewChild(GoogleMapComponent) googleMapComponent: GoogleMapComponent;
    @ViewChild("preSearchDiv") preSearchDiv: ElementRef;

    readonly i18n = this.i18nService.getI18n();
    allLocations: (GastroLocation | ShoppingLocation)[] = [];
    filteredLocations: (GastroLocation | ShoppingLocation)[] = [];
    query: GastroQuery | ShoppingQuery;
    isGastro: boolean | undefined;
    selectedLocation: Location | null = null;

    get fullMapView(): boolean { return module_fullMapView; }
    set fullMapView(fullMapView: boolean) { module_fullMapView = fullMapView; }

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
        const locationPromise: Promise<(GastroLocation | ShoppingLocation)[]> =
            this.isGastro ?
                this.locationService.getGastroLocations()
                :
                this.locationService.getShoppingLocations();
        locationPromise
            .then(locations => {
                this.allLocations = locations;
                this.query = this.getInitialQuery();
                this.googleMapComponent.init(locations);
                this.updateFilteredLocations();
                if (this.query.distance.place) {
                    this.googleMapComponent.selectCoordinates();
                }
            });
    }

    private getInitialQuery(): GastroQuery | ShoppingQuery {
        const initialQuery = this.localStorageService.settings.rememberLastQuery ?
            (this.isGastro ? this.localStorageService.gastroQuery : this.localStorageService.shoppingQuery)
            :
            (this.isGastro ? new GastroQuery() : new ShoppingQuery());
        if (!initialQuery.storedAt && NavigatorUtil.isPhoneOrTablet()) {
            initialQuery.distance.place = { isCurrent: true };
        }
        return initialQuery;
    }

    onSwipeleft() {
        if (this.hasMobileSize && !this.fullMapView) {
            this.enableFullMapView();
        }
    }

    onSwiperight() {
        if (this.hasMobileSize && this.fullMapView) {
            this.fullMapView = false;
        }
    }

    onQueryChange() {
        this.updateFilteredLocations();
        if (this.localStorageService.settings.rememberLastQuery) {
            if (this.query instanceof GastroQuery) {
                this.localStorageService.saveGastroQuery();
            } else {
                this.localStorageService.saveShoppingQuery();
            }
        }
    }

    updateFilteredLocations() {
        this.filteredLocations =
            this.allLocations
                .filter(it => this.searchService.isResult(it, this.query))
                .sort(this.getSortFunction());
    }

    onLocationSelectInResultsList(location: Location, center: boolean) {
        if (this.hasMobileSize) {
            this.enableFullMapView();
        }
        this.googleMapComponent.selectLocation(location, center);
        this.selectedLocation = location;
    }

    onLocationCenterInInfoBox() {
        this.googleMapComponent.selectLocation(this.selectedLocation, true);
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
        switch (this.query.sortOrder) {
            case "name":
                return (locationA, locationB) =>
                    locationA.name.localeCompare(locationB.name, this.localStorageService.getLanguage());
            case "distance":
                return (locationA, locationB) =>
                    this.getDistanceToCoordinates(locationA) - this.getDistanceToCoordinates(locationB);
            default:
                throw new Error("Unexpected value for SortOrder: " + this.query.sortOrder);
        }
    }

    private getDistanceToCoordinates(location: Location) {
        const place = this.query.distance.place;
        return place && place.coordinates ? location.getDistanceToCoordinatesInKm(place.coordinates) : 1;
    }

    onPlaceHighlightRequest(manual: boolean) {
        if (manual && this.hasMobileSize) {
            this.enableFullMapView();
        }
        this.selectedLocation = null;
        this.googleMapComponent.selectCoordinates();
    }

    onInfoBoxClose() {
        this.selectedLocation = null;
    }

    private get hasMobileSize(): boolean {
        return !window.matchMedia(this.configurationService.mediaQueries["min-width-1"]).matches;
    }
}
