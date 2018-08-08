import { getVeganCategories } from "./vegan-category";
import { Place } from "./place";

interface Distance {
    enabled: boolean;
    place: Place | null;
    km: number;
}

export class Query {
    text = "";
    textAppliesToNamesOnly = false;
    veganCategories: { [key: string]: boolean; } = {};
    openAtWeekDay: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "all" = "all";
    openAtTime = "";
    openNow = false;
    distance: Distance = { enabled: false, place: null, km: 1 };
    review = false;
    organic = false;
    handicappedAccessible = false;
    delivery = false;

    constructor(props: any = {}) {
        for (const veganCategory of getVeganCategories()) {
            this.veganCategories[veganCategory] = true;
        }
        Object.assign(this, props);
    }

    allWeekDays(): boolean {
        return this.openAtWeekDay === "all";
    }

    openAtTimeAsDate(): Date | undefined {
        return parseTime(this.openAtTime);
    }

    // Used by JSON.stringify().
    toJSON(): Query {
        const clone = Object.assign({}, this);
        clone.veganCategories = Object.assign({}, this.veganCategories);
        clone.distance = toSerializableDistance(this.distance);
        return clone;
    }
}

function toSerializableDistance(distance: Distance) {
    const clone = Object.assign({}, distance);
    if (distance.place) {
        clone.place = toSerializablePlace(distance.place);
    }
    return clone;
}

function toSerializablePlace(place: Place) {
    const clone = Object.assign({}, place);
    clone.coordinates = toSerializableCoordinates(place.coordinates);
    return clone;
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

// TODO: Refactor to library
function parseTime(hoursAndMinutes: string): Date | undefined {
    const parts = hoursAndMinutes.split(":");
    if (parts.length === 2 && parts[0].length === 2 && parts[1].length === 2) {
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        if (0 <= hours && hours <= 23 && 0 <= minutes && minutes <= 59) {
            const timeAsDate = new Date(0);
            timeAsDate.setHours(hours);
            timeAsDate.setMinutes(minutes);
            return timeAsDate;
        }
    }
    return undefined;
}
