import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";

import { ConfigurationService } from "../configuration.service";
import { I18nService } from "../i18n.service";
import { InfoWindowViewService } from "../info-window-view.service";
import { Location } from "../model/location";

declare var google: any; // Maybe TODO

@Component({
    selector: "app-google-map",
    template: `<div #mapDiv></div>`,
    styles: [ `div { width: 100%; height: 100%; }` ],
})
export class GoogleMapComponent {

    constructor(
        private readonly configurationService: ConfigurationService,
        private readonly i18nService: I18nService,
        private readonly infoWindowViewService: InfoWindowViewService,
    ) {}

    @Input() set locations(locations: Location[]) {
        this._locations = locations;

        for (const [marker, location] of this.markersToLocations.entries()) {
            const map = locations.includes(location) ? this.map : null;
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
                icon: this.configurationService.getIconUrlForGeoPosition()
            });

            this.geoPositionMarker = marker;

            google.maps.event.addListener(marker, "click", () => {
                this.map.setCenter(marker.getPosition());
                this.infoWindow.setContent("<h2>" + marker.getTitle() + "</h2>");
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

    @Output() readonly locationSelect = new EventEmitter<Location>();

    @ViewChild("mapDiv") mapDiv: ElementRef;

    private map: any; // Maybe TODO: Type
    private geoPositionMarker: any; // Maybe TODO: Type
    private readonly markersToLocations = new Map<any, Location>(); // TODO: Type
    private readonly locationsToMarkers = new Map<Location, any>(); // TODO: Type
    private readonly infoWindow = new google.maps.InfoWindow();
    private readonly i18n = this.i18nService.getI18n();

    init(locations: Location[]) {
        const center = this.configurationService.mapCenter;
        const mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(center.lat, center.lng),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.mapDiv.nativeElement, mapOptions);

        for (const location of locations) {
            this.createMarker(location);
        }
    }

    private createMarker(location: Location) {
        const marker = new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(location.latCoord, location.longCoord),
            title: location.name,
            icon: this.getIcon(location)
        });

        google.maps.event.addListener(marker, "click", () => {
            const content = this.infoWindowViewService.getContent(location, this.geoPosition);
            this.infoWindow.setContent(content);
            this.infoWindow.open(this.map, marker);
            this.locationSelect.emit(location);
        });

        this.markersToLocations.set(marker, location);
        this.locationsToMarkers.set(location, marker);
    }

    private getIcon(location: Location) {
        return {
            url: this.configurationService.getIconUrl(location.veganCategory),
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(15, 34)
        };
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
