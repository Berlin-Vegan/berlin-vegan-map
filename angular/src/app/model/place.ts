export class Place {

    constructor(props: any = null) {
        if (props) {
            this.coordinates = props.coordinates;
            this.address = props.address;
            this.isCurrent = props.isCurrent;
        }
    }

    coordinates?: Coordinates;
    address?: string;
    isCurrent: boolean;

    // Used by JSON.stringify().
    toJSON(): any {
        const obj = Object.assign({}, this);
        if (obj.coordinates) {
            obj.coordinates = toSerializableCoordinates(obj.coordinates);
        }
        return obj;
    }
}

// Coordinates returned from the browser may not be serializable with JSON.stringify,
// so we convert them to a simple object.
// See http://www.allannienhuis.com/archives/2015/02/04/beware-json-stringify/.
function toSerializableCoordinates(coordinates: Coordinates): Coordinates {
    return {
        accuracy: coordinates.accuracy,
        altitude: coordinates.altitude,
        altitudeAccuracy: coordinates.altitudeAccuracy,
        heading: coordinates.heading,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        speed: coordinates.speed,
    };
}
