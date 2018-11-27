import { Distance } from "./distance";
import { SortOrder } from "./sort-order";
import { Storable } from "./storable";
import { toMapObject } from "./util";
import { getVeganCategories } from "./vegan-category";

export abstract class Query extends Storable {
    text = "";
    textAppliesToNamesOnly = false;
    veganCategories: { [key: string]: boolean; } = toMapObject(getVeganCategories(), true);
    openAtWeekDay: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "all" = "all";
    openAtTime = "";
    openNow = false;
    distance: Distance = new Distance(this);
    review = false;
    organic = false;
    handicappedAccessible = false;
    sortOrder: SortOrder = "name";

    constructor(props: any = null) {
        super(props);
        if (props) {
            this.text = props.text;
            this.textAppliesToNamesOnly = props.textAppliesToNamesOnly;
            this.veganCategories =  Object.assign({}, props.veganCategories);
            this.openAtWeekDay = props.openAtWeekDay;
            this.openAtTime = props.openAtTime;
            this.openNow = props.openNow;
            this.distance = new Distance(this, props.distance);
            this.review = props.review;
            this.organic = props.organic;
            this.handicappedAccessible = props.handicappedAccessible;
            this.sortOrder = props.sortOrder;
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
