import { DayOfWeek } from "./day-of-week";
import { I18nService } from "../i18n.service";
import { OpeningTimeInterval } from "./opening-time-interval";

export class OpeningTime {

    readonly dayIndex: DayOfWeek;
    readonly friendlyDay: string;
    readonly friendlyDayShort: string;
    readonly interval: OpeningTimeInterval;

    constructor(dayIndex: DayOfWeek, interval: OpeningTimeInterval, private i18nService: I18nService) {
        this.dayIndex = dayIndex;
        this.friendlyDay = i18nService.getI18n().enums.weekday[dayIndex + ""];
        this.friendlyDayShort = i18nService.abbreviateWeekDay(this.friendlyDay);
        this.interval = interval;
    }
}
