import { Component, EventEmitter, Output, ViewChild } from "@angular/core";

import { ConfigurationService } from "../configuration.service";
import { PlaceSelectComponent } from "../place-select/place-select.component";
import { I18nService } from "../i18n.service";

@Component({
    selector: "app-geolocation",
    templateUrl: "./geolocation.component.html",
    styleUrls: [ "./geolocation.component.scss" ],
})
export class GeolocationComponent {

    constructor(
        private readonly configurationService: ConfigurationService,
        private readonly i18nService: I18nService,
    ) { }

    @Output() readonly coordinatesChange = new EventEmitter<Coordinates | null>();
    @Output() readonly highlightRequest = new EventEmitter<void>();
    @ViewChild(PlaceSelectComponent) placeSelectionComponent: PlaceSelectComponent;
    readonly i18n = this.i18nService.getI18n();
    readonly isGeolocationSupported = !!navigator.geolocation;
    isChecked = false;
    mode: "detect" | "select" = "detect";
    coordinates: Coordinates | null = null;
    info = "";
    error = "";

    onChange() {
        if (this.isChecked) {
            this.detectCoordinates();
        } else {
            this.clear();
        }
    }

    detectCoordinates() {
        assert(navigator.geolocation);
        assert(this.info === "");
        assert(this.error === "");
        this.isChecked = true;
        this.mode = "detect";
        this.placeSelectionComponent.clear();
        this.info = this.i18n.geolocation.detecting;
        this.updateCoordinates(0, true);
    }

    private updateCoordinates(timeout: number, firstCall: boolean) {
        setTimeout(() => {
            if (this.isChecked && this.mode === "detect") {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        if (this.isChecked && this.mode === "detect") {
                            this.info = "";
                            this.error = "";
                            this.coordinates = position.coords;
                            this.coordinatesChange.emit(this.coordinates);
                            if (firstCall) {
                                this.highlightRequest.emit();
                            }
                            this.updateCoordinates(
                                this.configurationService.refreshCoordinatesTimeoutMillis,
                                false
                            );
                        }
                    },
                    positionError => {
                        if (this.isChecked && this.mode === "detect") {
                            this.info = "";
                            this.error = this.getErrorMessage(positionError);
                            if (!firstCall) {
                                this.updateCoordinates(
                                    this.configurationService.refreshCoordinatesTimeoutMillis,
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

    selectCoordinates(coordinates: Coordinates) {
        this.isChecked = true;
        this.mode = "select";
        this.coordinates = coordinates;
        this.coordinatesChange.emit(this.coordinates);
        this.highlightRequest.emit();
    }

    private clear() {
        this.info = "";
        this.error = "";
        this.placeSelectionComponent.clear();
        if (this.coordinates !== null) {
            this.coordinates = null;
            this.coordinatesChange.emit(null);
        }
    }
}

function assert(expression: any) {
    if (!expression) {
        alert("Unexpected condition");
    }
}
