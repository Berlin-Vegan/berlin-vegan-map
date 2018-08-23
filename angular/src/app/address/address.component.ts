import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

import { I18nService } from "../i18n.service";
import { Location } from "../model/location";

@Component({
    selector: "app-address",
    templateUrl: "address.component.html",
    styleUrls: [ "address.component.scss" ]
})
export class AddressComponent implements OnChanges {

    constructor(private readonly i18nService: I18nService) { }

    @Input() location: Location;
    @Input() coordinates: Coordinates | undefined;

    readonly i18n = this.i18nService.getI18n();
    googleMapsSearchUrl = "";
    googleMapsDirectionsUrl = "";
    bvgDirectionsUrl = "";

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
            this.location.publicTransport && this.coordinates ?
            encodeURI(`https://fahrinfo.bvg.de/Fahrinfo/bin/query.bin/dn?&to=${this.location.publicTransport}`)
            :
            "";
    }
}
