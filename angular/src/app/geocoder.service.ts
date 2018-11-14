import { Injectable } from "@angular/core";

@Injectable()
export class GeocoderService {

    private readonly geocoder = new google.maps.Geocoder();

    getAddress(coordinates: Coordinates): Promise<string> {
        const request = { location: new google.maps.LatLng(coordinates.latitude, coordinates.longitude) };
        return new Promise(
            (resolve, reject) => {
                this.geocoder.geocode(
                    request,
                    (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                        if (status === google.maps.GeocoderStatus.OK) {
                            resolve(results[0].formatted_address);
                        } else {
                            reject(new Error(status.toString()));
                        }
                    }
                );
            }
        );
    }
}
