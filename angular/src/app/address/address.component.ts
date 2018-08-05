import { Component, Input } from "@angular/core";

import { I18nService } from "../i18n.service";
import { Location } from "../model/location";

@Component({
    selector: "app-address",
    templateUrl: "address.component.html",
    styleUrls: [ "address.component.scss" ]
})
export class AddressComponent {

    constructor(private readonly i18nService: I18nService) { }

    @Input() location: Location;
    @Input() coordinates: Coordinates | null;

    readonly i18n = this.i18nService.getI18n();

    get googleMapsSearchUrl(): string {
        const l = this.location;
        return encodeURI(
            `https://www.google.com/maps/search/?api=1&query=${l.name} ${l.street} ${l.cityCode} ${l.city}`
        );
    }

    get googleMapsDirectionsUrl(): string {
        const l = this.location;
        return this.coordinates ?
            encodeURI(
                `https://www.google.com/maps/dir/?api=1`
                + `&origin=${this.coordinates.latitude}, ${this.coordinates.longitude}`
                + `&destination=${l.name} ${l.street} ${l.cityCode} ${l.city}`
            )
            :
            "";
    }

    get bvgDirectionsUrl(): string {
        if (!this.location.publicTransport) {
            alert("Unexpected condition.");
        }
        return this.coordinates ?
            encodeURI(`https://fahrinfo.bvg.de/Fahrinfo/bin/query.bin/dn?&to=${this.location.publicTransport}`)
            :
            "";
    }
}
