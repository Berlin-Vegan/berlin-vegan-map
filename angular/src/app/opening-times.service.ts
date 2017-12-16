import { Injectable } from "@angular/core";

import { I18nService } from "./i18n.service";
import { Location } from "./model/location";
import { TimeInterval } from "./model/time-interval";
import { OpeningTimeInterval } from "./model/opening-time-interval";
import { OpeningTime } from "./model/opening-time";
import { OpeningTimesCollection } from "./model/opening-times-collection";

declare var JsCommon: () => void; // TODO
const jsCommon = new JsCommon();

@Injectable()
export class OpeningTimesService {

    constructor(private readonly i18nService: I18nService) {}

    getOpeningTimesCollection(location: Location): OpeningTimesCollection {
        return new OpeningTimesCollection(
        [
            new OpeningTime(0, this.parseOpeningTimeInterval(location.otSun), this.i18nService),
            new OpeningTime(1, this.parseOpeningTimeInterval(location.otMon), this.i18nService),
            new OpeningTime(2, this.parseOpeningTimeInterval(location.otTue), this.i18nService),
            new OpeningTime(3, this.parseOpeningTimeInterval(location.otWed), this.i18nService),
            new OpeningTime(4, this.parseOpeningTimeInterval(location.otThu), this.i18nService),
            new OpeningTime(5, this.parseOpeningTimeInterval(location.otFri), this.i18nService),
            new OpeningTime(6, this.parseOpeningTimeInterval(location.otSat), this.i18nService)
        ],
        this.i18nService);
    }

    getOpenComment(location: Location): string {
        return location.openComment && this.i18nService.getLanguage() === "en" ?
            "Please see location website for opening time details!"
            :
            location.openComment;
    }

    private parseOpeningTimeInterval(otString: string): OpeningTimeInterval {
        let timeInterval;
        let friendly;

        if (!!otString) {
            timeInterval = this.parseTimeInterval(otString);
            friendly = this.i18nService.formatTimeInterval(timeInterval.begin, timeInterval.end); // TODO
        } else {
            timeInterval = null;
            friendly = this.i18nService.getI18n().openingTimes.isClosed;
        }

        return new OpeningTimeInterval(timeInterval, friendly);
    }

    private parseTimeInterval(intervalString: string): TimeInterval {
        const parts = intervalString.split(" - ");
        const begin = parseTimeAsDate(parts[0]);
        const end = parseTimeAsDate(parts[1]);
        return new TimeInterval(begin, end);

        function parseTimeAsDate(timeString) {
            const time = jsCommon.dateUtil.parseTime(timeString);
            const date = new Date(0);
            date.setHours(time.hours, time.minutes);
            return date;
        }
    }
}
