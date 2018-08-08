import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from "@angular/core";
import {} from "@types/googlemaps";

@Component({
    selector: "app-place-select",
    templateUrl: "./place-select.component.html",
    styleUrls: [ "./place-select.component.scss" ],
})
export class PlaceSelectComponent implements OnInit {

    constructor(private ngZone: NgZone) {}

    @Input() placeholder: string;
    @Output() readonly coordinatesChange = new EventEmitter<Coordinates>();
    @ViewChild("input") input: ElementRef;

    ngOnInit() {
        const options = {
            bounds: new google.maps.LatLngBounds(
                new google.maps.LatLng(52.35, 13.1),
                new google.maps.LatLng(52.65, 13.8),
            ),
            strictBounds: true,
            componentRestrictions: { country: "de" },
            types: ["address"],
        };
        const autocomplete = new google.maps.places.Autocomplete(this.input.nativeElement, options);
        autocomplete.addListener(
            "place_changed",
            () => this.ngZone.run(() => this.coordinatesChange.emit(toCoordinates(autocomplete.getPlace())))
        );
    }

    clear() {
        this.input.nativeElement.value = "";
    }
}

function toCoordinates(placeResult: google.maps.places.PlaceResult): Coordinates {
    return {
        accuracy: 1,
        latitude: placeResult.geometry.location.lat(),
        longitude: placeResult.geometry.location.lng(),
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
    };
}
