import { Component, EventEmitter, OnInit, Output } from "@angular/core";

import { ConfigurationService } from "../configuration.service";
import { I18nService } from "../i18n.service";

@Component({
    selector: "app-geolocation",
    templateUrl: "./geolocation.component.html",
})
export class GeolocationComponent {

    constructor(
        private readonly configurationService: ConfigurationService,
        private readonly i18nService: I18nService,
    ) { }

    @Output() readonly positionChange = new EventEmitter<any>(); // TODO: Type
    @Output() readonly highlightRequest = new EventEmitter<void>();
    private readonly options = {
        enableHighAccuracy: true,
        timeout: this.configurationService.geoLocationTimeoutMillis
    };
    readonly i18n = this.i18nService.getI18n();
    readonly isGeolocationSupported = !!navigator.geolocation;
    isChecked = false;
    geoposition = null; // TODO: Type
    info = "";
    error = "";

    onChange() {
        if (this.isChecked) {
            this.detectGeoposition();
        } else {
            this.clearGeoposition();
        }
    }

    private detectGeoposition() {
        assert(!!navigator.geolocation);
        assert(this.geoposition === null);
        assert(this.info === "");
        assert(this.error === "");

        this.info = this.i18n.geolocation.detecting;

        navigator.geolocation.getCurrentPosition(
            position => {
                this.info = "";
                this.geoposition = this.transformGeoposition(position);
                this.positionChange.emit(this.geoposition);
            },
            positionError => {
                this.info = "";
                this.error = this.getErrorMessage(positionError);
            },
            this.options
        );
    }

    private transformGeoposition(position: Position): any { // TODO: Type
        return {
            lat: () => position.coords.latitude,
            lng: () => position.coords.longitude,
        };
    }

    private getErrorMessage(positionError: PositionError): string {
        let reason;
        switch (positionError.code) {
            case 1: // PositionError.PERMISSION_DENIED:
                reason = this.i18n.geolocation.PERMISSION_DENIED;
                break;
            case 2: // PositionError.POSITION_UNAVAILABLE:
                reason = this.i18n.geolocation.POSITION_UNAVAILABLE;
                break;
            case 3: // PositionError.TIMEOUT:
                reason = this.i18n.geolocation.TIMEOUT;
                break;
        }
        return this.i18n.geolocation.theError + ": " + reason;
    }

    private clearGeoposition() {
        this.info = "";
        this.error = "";
        if (this.geoposition !== null) {
            this.geoposition = null;
            this.positionChange.emit(null);
        }
    }
}

function assert(condition: boolean) {
    if (!condition) {
        alert("Unexpected condition");
    }
}
