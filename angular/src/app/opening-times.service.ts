import { Injectable, Inject } from "@angular/core";
import { DateUtil } from "@marco-eckstein/js-utils";

import { I18N } from "./i18n-provider";
import { I18nService } from "./i18n.service";
import { JsonLocation } from "./model/json/json-location";
import { TimeInterval } from "./model/time-interval";
import { OpeningTimeInterval } from "./model/opening-time-interval";
import { OpeningTime } from "./model/opening-time";
import { OpeningTimesCollection } from "./model/opening-times-collection";

@Injectable()
export class OpeningTimesService {

    constructor(
        @Inject(I18N) private readonly i18n: any,
        private readonly i18nService: I18nService,
    ) {}

    getOpeningTimesCollection(location: JsonLocation): OpeningTimesCollection {
        return new OpeningTimesCollection(
        [
            new OpeningTime(0, this.parseOpeningTimeInterval(location.otSun), this.i18nService, this.i18n),
            new OpeningTime(1, this.parseOpeningTimeInterval(location.otMon), this.i18nService, this.i18n),
            new OpeningTime(2, this.parseOpeningTimeInterval(location.otTue), this.i18nService, this.i18n),
            new OpeningTime(3, this.parseOpeningTimeInterval(location.otWed), this.i18nService, this.i18n),
            new OpeningTime(4, this.parseOpeningTimeInterval(location.otThu), this.i18nService, this.i18n),
            new OpeningTime(5, this.parseOpeningTimeInterval(location.otFri), this.i18nService, this.i18n),
            new OpeningTime(6, this.parseOpeningTimeInterval(location.otSat), this.i18nService, this.i18n),
        ],
        this.i18n);
    }

    private parseOpeningTimeInterval(otString: string): OpeningTimeInterval {
        let timeInterval: TimeInterval | null;
        let friendly: string;

        if (otString) {
            timeInterval = this.parseTimeInterval(otString);
            friendly = this.i18nService.formatTimeInterval(timeInterval);
        } else {
            timeInterval = null;
            friendly = this.i18n.openingTimes.isClosed;
        }

        return new OpeningTimeInterval(timeInterval, friendly);
    }

    private parseTimeInterval(intervalString: string): TimeInterval {
        const parts = intervalString.split(" - ");
        const begin = parseTimeAsDate(parts[0]);
        const end = parseTimeAsDate(parts[1]);
        return new TimeInterval(begin, end);

        function parseTimeAsDate(timeString: string) {
            const time = DateUtil.parseTime(timeString);
            const date = new Date(0);
            date.setHours(time.hours, time.minutes);
            return date;
        }
    }
}
