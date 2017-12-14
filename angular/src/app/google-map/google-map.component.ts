import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { ConfigurationService } from "../configuration.service";
import { I18nService } from "../i18n.service";
import { InfoWindowViewService } from "../info-window-view.service";
import { Location } from "../location";
import { ResourcesService } from "../resources.service";

declare var google: any; // Maybe TODO
declare var JsCommon: () => void; // TODO
const jsCommon = new JsCommon();

@Component({
    selector: "app-google-map",
    template: `<div id="map"></div>`,
})
export class GoogleMapComponent {

    constructor(
        private readonly configurationService: ConfigurationService,
        private readonly i18nService: I18nService,
        private readonly infoWindowViewService: InfoWindowViewService,
        private readonly resourcesService: ResourcesService
    ) {}

    @Input() set locations(locations: Location[]) {
        this._locations = locations;

        for (const marker of this.locationMarkers) {
            const map = locations.includes(marker.location) ? this.map : null;
            if (marker.map !== map) {
                marker.setMap(map);
            }
        }
    }

    get locations(): Location[] {
        return this._locations;
    }

    private _locations: Location[];

    @Input() set geoPosition(geoPosition) { // TODO: Type
        this._geoPosition = geoPosition;

        if (geoPosition) {
            const marker = new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng(geoPosition.lat(), geoPosition.lng()),
                title: this.i18n.geolocation.currentLocation,
                icon: this.resourcesService.getDotImageUrl("blue")
            });

            this.geoPositionMarker = marker;

            google.maps.event.addListener(marker, "click", () => {
                this.map.setCenter(marker.getPosition());
                this.infoWindow.setContent("<h2>" + marker.title + "</h2>");
                this.infoWindow.open(this.map, marker);
            });

            google.maps.event.trigger(marker, "click");
        } else if (this.geoPositionMarker) {
            this.geoPositionMarker.setMap(null);
        }
    }

    get geoPosition() { // TODO: Type
        return this._geoPosition;
    }

    private _geoPosition; // TODO: Type

    @Output() readonly locationSelect = new EventEmitter<any>(); // TODO: Type

    map: any; // Maybe TODO: Type
    locationMarkers: any[] = []; // Maybe TODO: Type
    locationsToMarkers = new Map<Location, any>(); // TODO: Type
    geoPositionMarker: any; // Maybe TODO: Type
    infoWindow = new google.maps.InfoWindow();
    private readonly i18n = this.i18nService.getI18n();

    init(locations: Location[]) {
        const center = this.configurationService.mapCenter;
        const mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(center.lat, center.lng),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(document.getElementById("map"), mapOptions); // TODO

        for (const location of locations){
            this.createMarker(location);
        }
    }

    private createMarker(location: Location) {
        const marker = new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(location.latCoord, location.longCoord),
            title: location.name,
            location: location,
            icon: this.getMarkerImage(location)
        });

        this.locationsToMarkers.set(location, marker);

        google.maps.event.addListener(marker, "click", () => {
            const content = this.infoWindowViewService.getContent(
                marker.location,
                this.geoPosition ? this.geoPosition : undefined // TODO
            );

            this.infoWindow.setContent(content);
            this.infoWindow.open(this.map, marker);
            this.locationSelect.emit(marker.location);
        });

        this.locationMarkers.push(marker);
    }

    private getMarkerImage(location: Location) {
        return new google.maps.MarkerImage(
            this.getMarkerImageUrl(location),
            new google.maps.Size(50, 50),
            new google.maps.Point(0, 0),
            new google.maps.Point(15, 34)
        );
    }

    // TODO: Refactor, because it is duplicated somewhere else.
    private getMarkerImageUrl(location: Location) {
        return this.resourcesService.getDotImageUrl(this.configurationService.getColor(location.getVeganCategory()));
    }

    selectLocation(location: Location) {
        setTimeout(() => { google.maps.event.trigger(this.locationsToMarkers.get(location), "click"); }, 0);
    }

    selectGeoPosition() {
        setTimeout(() => { google.maps.event.trigger(this.geoPositionMarker, "click"); }, 0);
    }

    resize() {
        setTimeout(() => { google.maps.event.trigger(this.map, "resize"); }, 0);
    }
}
