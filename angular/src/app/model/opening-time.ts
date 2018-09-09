import { DayOfWeek } from "@marco-eckstein/js-utils";

import { I18nService } from "../i18n.service";
import { OpeningTimeInterval } from "./opening-time-interval";

export class OpeningTime {

    readonly dayIndex: DayOfWeek;
    readonly friendlyDay: string;
    readonly friendlyDayShort: string;
    readonly interval: OpeningTimeInterval;

    constructor(
        dayIndex: DayOfWeek,
        interval: OpeningTimeInterval,
        i18nService: I18nService,
        i18n: any,
    ) {
        this.dayIndex = dayIndex;
        this.friendlyDay = i18n.enums.weekday[dayIndex + ""];
        this.friendlyDayShort = i18nService.abbreviateWeekDay(this.friendlyDay);
        this.interval = interval;
    }
}
