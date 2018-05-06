import { getVeganCategories } from "./vegan-category";

interface Distance {
    enabled: boolean;
    coordinates: Coordinates | null;
    km: number;
}

export class Query {
    text = "";
    textAppliesToNamesOnly = false;
    veganCategories: { [key: string]: boolean; } = {};
    openAtWeekDay: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "all" = "all";
    openAtTime = "";
    openNow = false;
    distance: Distance = { enabled: false, coordinates: null, km: 1 };

    constructor() {
        for (const veganCategory of getVeganCategories()) {
            this.veganCategories[veganCategory] = true;
        }
    }

    allWeekDays(): boolean {
        return this.openAtWeekDay === "all";
    }

    openAtTimeAsDate(): Date | undefined {
        return parseTime(this.openAtTime);
    }
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
