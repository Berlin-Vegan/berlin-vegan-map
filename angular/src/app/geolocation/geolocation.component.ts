import { Component, EventEmitter, Inject, Input, OnDestroy, Output } from "@angular/core";

import { ConfigurationService } from "../configuration.service";
import { GeocoderService } from "../geocoder.service";
import { I18N } from "../i18n-provider";
import { Place } from "../model/place";

@Component({
    selector: "app-geolocation",
    templateUrl: "./geolocation.component.html",
    styleUrls: [ "./geolocation.component.scss" ],
})
export class GeolocationComponent implements OnDestroy {

    constructor(
        @Inject(I18N) readonly i18n: any,
        private readonly configurationService: ConfigurationService,
        private readonly geocoderService: GeocoderService,
    ) { }

    @Input() set place(place: Place | null) {
        if (place) {
            this.isChecked = true;
            if (place.isCurrent && !this.isDetecting) {
                this.detectPlace();
            }
        }
        this._place = place;
    }
    get place(): Place | null { return this._place; }

    private _place: Place | null = null;

    @Output() readonly placeChange = new EventEmitter<Place | null>();
    @Output() readonly manualHighlightRequest = new EventEmitter<void>();
    @Output() readonly autoHighlightRequest = new EventEmitter<void>();
    readonly isGeolocationSupported = !!navigator.geolocation;
    isChecked = false;
    info = "";
    error = "";
    isDetecting = false;

    onCheckboxChange() {
        if (this.isChecked) {
            this.detectPlace();
        } else {
            this.clear();
        }
    }

    detectPlace() {
        this.isChecked = true;
        this.isDetecting = true;
        this.info = this.i18n.geolocation.detecting;
        this.updatePlace(0, true);
    }

    private updatePlace(timeout: number, firstCall: boolean) {
        setTimeout(() => {
            if (this.isChecked && this.isDetecting) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        if (this.isChecked && this.isDetecting) {
                            this.info = "";
                            this.error = "";
                            this.geocoderService.getAddress(position.coords).then(address => {
                                this.place = new Place({
                                    coordinates: position.coords,
                                    address: address,
                                    isCurrent: true,
                                });
                                this.placeChange.emit(this.place);
                                if (firstCall) {
                                    this.autoHighlightRequest.emit();
                                }
                                this.updatePlace(
                                    this.configurationService.geoLocationUpdateMillis,
                                    false
                                );
                            });
                        }
                    },
                    positionError => {
                        if (this.isChecked && this.isDetecting) {
                            this.info = "";
                            this.error = this.getErrorMessage(positionError);
                            if (!firstCall) {
                                this.updatePlace(
                                    this.configurationService.geoLocationUpdateMillis,
                                    false
                                );
                            }
                        }
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: this.configurationService.geoLocationTimeoutMillis
                    }
                );
            }
        }, timeout);
    }

    private getErrorMessage(positionError: PositionError): string {
        let reason;
        switch (positionError.code) {
            case positionError.PERMISSION_DENIED:
                reason = this.i18n.geolocation.PERMISSION_DENIED;
                break;
            case positionError.POSITION_UNAVAILABLE:
                reason = this.i18n.geolocation.POSITION_UNAVAILABLE;
                break;
            case positionError.TIMEOUT:
                reason = this.i18n.geolocation.TIMEOUT;
                break;
        }
        return this.i18n.geolocation.theError + ": " + reason;
    }

    onPlaceChange(place: Place) {
        this.isChecked = true;
        this.info = "";
        this.error = "";
        this.isDetecting = false;
        this.place = place;
        this.placeChange.emit(this.place);
        this.autoHighlightRequest.emit();
    }

    private clear() {
        this.info = "";
        this.error = "";
        this.isDetecting = false;
        if (this.place !== null) {
            this.place = null;
            this.placeChange.emit(null);
        }
    }

    ngOnDestroy(): void {
        this.isChecked = false; // Stops timeouts.
    }
}
