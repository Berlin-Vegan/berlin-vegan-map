import { Injectable } from "@angular/core";
import { I18nUtil } from "@marco-eckstein/js-utils";

import { TimeInterval } from "./model/time-interval";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class I18nService {

    constructor(private readonly localStorageService: LocalStorageService) {}

    private readonly language = this.localStorageService.getLanguage();

    formatNumberString(numberString: string): string {
        return I18nUtil.formatNumberString(numberString, this.language);
    }

    abbreviateWeekDay(weekday: string): string {
        return I18nUtil.abbreviateWeekDay(weekday, this.language);
    }

    formatTimeInterval(timeInterval: TimeInterval): string {
        return I18nUtil.formatTimeInterval(timeInterval.begin, timeInterval.end, this.language);
    }
}
