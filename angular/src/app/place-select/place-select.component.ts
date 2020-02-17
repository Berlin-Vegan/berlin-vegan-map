import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from "@angular/core";

import { ConfigurationService } from "../configuration.service";
import { Place } from "../model/place";

@Component({
    selector: "app-place-select",
    templateUrl: "./place-select.component.html",
    styleUrls: ["./place-select.component.scss"],
})
export class PlaceSelectComponent implements OnInit {

    constructor(
        readonly configurationService: ConfigurationService,
        private readonly ngZone: NgZone
    ) { }

    @Input() placeholder: string;

    @Input() set place(place: Place | null) {
        this._place = place;
        this.address = place?.address && !place.isCurrent ? place.address : "";
    }
    get place(): Place | null { return this._place; }
    private _place: Place | null;

    @Output() readonly placeChange = new EventEmitter<Place>();
    @ViewChild("input", { static: true }) input: ElementRef;
    address: string;
    private autocomplete: google.maps.places.Autocomplete;

    ngOnInit() {
        const options = {
            componentRestrictions: { country: this.configurationService.area.country },
            bounds: this.configurationService.area.bounds,
            strictBounds: true,
            types: ["address"],
        };
        this.autocomplete = new google.maps.places.Autocomplete(this.input.nativeElement, options);
        this.autocomplete.addListener(
            "place_changed",
            () => this.ngZone.run(() => {
                this.address = this.input.nativeElement.value;
                this.placeChange.emit(this.getPlace());
            })
        );
    }

    getPlace(): Place {
        const placeResult = this.autocomplete.getPlace();
        return new Place({
            coordinates: {
                accuracy: 1,
                latitude: placeResult.geometry.location.lat(),
                longitude: placeResult.geometry.location.lng(),
                altitude: null,
                altitudeAccuracy: null,
                heading: null,
                speed: null,
            },
            address: this.address,
            isCurrent: false,
        });
    }
}
