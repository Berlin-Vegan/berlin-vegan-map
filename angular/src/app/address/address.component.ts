import { Component, Input, OnChanges, SimpleChanges, Inject } from "@angular/core";

import { I18N } from "../i18n-provider";
import { LocalStorageService } from "../local-storage.service";
import { Location } from "../model/location";
import { Place } from "../model/place";
import { GastroLocation } from "../model/gastro-location";

@Component({
    selector: "app-address",
    templateUrl: "address.component.html",
    styleUrls: [ "address.component.scss" ]
})
export class AddressComponent implements OnChanges {

    constructor(
        @Inject(I18N) readonly i18n: any,
        private readonly localStorageService: LocalStorageService,
    ) { }

    @Input() location: Location;
    @Input() place: Place | undefined;

    readonly language = this.localStorageService.getLanguage();
    googleMapsSearchUrl = "";
    googleMapsDirectionsUrl = "";
    bvgDirectionsUrl = "";

    get coordinates(): Coordinates | undefined {
        return this.place ? this.place.coordinates : undefined;
    }

    ngOnChanges(changes: SimpleChanges) {
        const l = this.location;
        if (changes.location) {
            this.googleMapsSearchUrl = encodeURI(
                `https://www.google.com/maps/search/?api=1&query=${l.name} ${l.street} ${l.cityCode} ${l.city}`
            );
        }
        this.googleMapsDirectionsUrl =
            this.coordinates ?
                encodeURI(
                    `https://www.google.com/maps/dir/?api=1`
                    + `&origin=${this.coordinates.latitude}, ${this.coordinates.longitude}`
                    + `&destination=${l.name} ${l.street} ${l.cityCode} ${l.city}`
                )
                :
                "";
        this.bvgDirectionsUrl =
            this.place && this.coordinates ?
                encodeURI(
                    `https://fahrinfo.bvg.de/Fahrinfo/bin/query.bin/${this.language}?`
                    + `pk_campaign=BVG.de_Eingabe`
                    + `&from=${getBvgAddressOfPlace(this.place)}`
                    + `&REQ0JourneyStopsS0ID=&REQ0JourneyStopsfromID=`
                    + `&REQ0JourneyStopsSA1=7&HWAI%3DJS%21js=yes&HWAI%3DJS%21ajax=yes`
                    + `&to=${getBvgAddressOfLocation(l)}`
                    + `&REQ0JourneyStopsZ0ID=&REQ0JourneyStopstoID=&REQ0JourneyStopsZA1=7&timesel=depart`
                    + `&lang=${this.language}`
                    + `&start=0&existTotal_enable=yes&application=PRIVATETRANSPORT&REQ0Total_Foot_enable=1`
                    + `&REQ0Total_Foot_minDist=0&REQ0Total_Foot_maxDist=2000&REQ0Total_Foot_speed=100`
                    + `&REQ0Total_Bike_enable=1&REQ0Total_Bike_minDist=1000&REQ0Total_Bike_maxDist=5000`
                    + `&getstop=1`
                )
                :
                "";
    }
}

function getBvgAddressOfPlace(p: Place) {
    return p.address ? p.address.replace(", Deutschland", "") : "";
}

function getBvgAddressOfLocation(l: Location) {
    return `${l.cityCode} ${l.city}${getBvgDistrictPostfix(l)}, ${l.street}`;
}

function getBvgDistrictPostfix(l: Location) {
    return l instanceof GastroLocation ? `-${l.district}` : ``;
}
