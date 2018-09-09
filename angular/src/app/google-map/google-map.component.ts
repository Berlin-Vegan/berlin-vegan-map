import {
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgZone,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";
import {} from "@types/googlemaps";

import { ConfigurationService } from "../configuration.service";
import { I18N } from "../i18n-provider";
import { Location } from "../model/location";
import { LocalStorageService } from "../local-storage.service";

@Component({
    selector: "app-google-map",
    template: `<div #mapDiv></div>`,
    styles: [ `div { width: 100%; height: 100%; }` ],
})
export class GoogleMapComponent implements OnInit {

    constructor(
        @Inject(I18N) private readonly i18n: any,
        private readonly configurationService: ConfigurationService,
        private readonly localStorageService: LocalStorageService,
        private readonly ngZone: NgZone,
    ) {}

    @Input() set locations(locations: Location[]) {
        this._locations = locations;

        for (const [marker, location] of this.markersToLocations.entries()) {
            const map = locations.includes(location) ? this.map : null;
            if (marker.getMap() !== map) {
                marker.setMap(map);
            }
        }
    }

    get locations(): Location[] {
        return this._locations;
    }

    private _locations: Location[];

    @Input() set coordinates(coordinates: Coordinates | undefined) {
        this._coordinates = coordinates;

        if (coordinates) {
            const position = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);

            if (this.coordinatesMarker) {
                this.coordinatesMarker.setPosition(position);
            } else {
                this.coordinatesMarker = new google.maps.Marker({
                    map: this.map,
                    position: position,
                    title: this.i18n.geolocation.currentPosition,
                    icon: this.configurationService.getIconUrlForCoordinates()
                });

                google.maps.event.addListener(this.coordinatesMarker, "click", () => {
                    this.map.setCenter(this.coordinatesMarker.getPosition());
                    this.infoWindow.setContent(this.coordinatesMarker.getTitle());
                    this.infoWindow.open(this.map, this.coordinatesMarker);
                });
            }
        } else if (this.coordinatesMarker) {
            this.coordinatesMarker.setMap(null);
            delete this.coordinatesMarker;
        }
    }

    get coordinates(): Coordinates | undefined {
        return this._coordinates;
    }

    private _coordinates: Coordinates | undefined;

    @Output() readonly locationSelect = new EventEmitter<Location | null>();

    @ViewChild("mapDiv") mapDiv: ElementRef;

    private map: google.maps.Map;
    private coordinatesMarker: google.maps.Marker;
    private readonly markersToLocations = new Map<google.maps.Marker, Location>();
    private readonly locationsToMarkers = new Map<Location, google.maps.Marker>();
    private readonly infoWindow = new google.maps.InfoWindow();

    ngOnInit() {
        const mapOptions: google.maps.MapOptions = {
            zoom: this.configurationService.area.zoom,
            center: this.configurationService.area.center,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gestureHandling: "greedy",
            mapTypeControl: this.localStorageService.settings.map.mapTypeControl,
            zoomControl: this.localStorageService.settings.map.zoomControl,
        };

        this.map = new google.maps.Map(this.mapDiv.nativeElement, mapOptions);

        // For accessibility. See https://stackoverflow.com/a/50845779.
        google.maps.event.addListenerOnce(this.map, "idle", () => {
            this.mapDiv.nativeElement.getElementsByTagName("iframe")[0].title = "Google Maps";
        });
    }

    init(locations: Location[]) {
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
            this.infoWindow.setContent(location.name);
            this.infoWindow.open(this.map, marker);
            this.ngZone.run(() => this.locationSelect.emit(location));
        });

        this.markersToLocations.set(marker, location);
        this.locationsToMarkers.set(location, marker);
    }

    private getIcon(location: Location): google.maps.Icon {
        return {
            url: this.configurationService.getIconUrl(location.veganCategory),
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(15, 34)
        };
    }

    selectLocation(location: Location | null, center = false) {
        if (location) {
            setTimeout(() => {
                const marker = this.locationsToMarkers.get(location)!;
                if (center) {
                    this.map.setCenter(marker.getPosition());
                }
                google.maps.event.trigger(marker, "click");
            }, 0);
        } else {
            this.infoWindow.close();
        }
    }

    selectCoordinates() {
        setTimeout(() => { google.maps.event.trigger(this.coordinatesMarker, "click"); }, 0);
    }

    resize() {
        setTimeout(() => { google.maps.event.trigger(this.map, "resize"); }, 0);
    }
}
