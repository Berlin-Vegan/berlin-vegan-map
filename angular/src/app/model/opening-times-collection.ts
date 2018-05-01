import { DayOfWeek } from "./day-of-week";
import { I18nService } from "../i18n.service";
import { OpeningTime } from "./opening-time";

declare var JsCommon: () => void; // TODO
const jsCommon = new JsCommon();

export class OpeningTimesCollection {

    constructor(public readonly openingTimes: OpeningTime[], private readonly i18nService: I18nService) {}

    getTodayFriendly(): string {
        const otIntervalToday = this.openingTimes[new Date().getDay()].interval;
        return otIntervalToday.isOpen ?
            this.i18nService.getI18n().openingTimes.isOpenToday + ": " + otIntervalToday.friendly
            :
            this.i18nService.getI18n().openingTimes.isClosedToday;
    }

    getCompressed(): OpeningTime[][] {
        const compressedOts: OpeningTime[][] = [];

        for (let day = 1; day <= 7; day++) {

            const ot = this.openingTimes[day === 7 ? 0 : day];

            if (day > 1) {

                const lastGroup = compressedOts[compressedOts.length - 1];

                if (lastGroup[0].interval.friendly === ot.interval.friendly) {
                    lastGroup.push(ot);
                    continue;
                }
            }

            const group = [ot];
            compressedOts.push(group);
        }

        return compressedOts;
    }

    isOpen(weekDay: DayOfWeek, time?: Date): boolean {
        return jsCommon.openingTimesUtil.isOpen(
            this.openingTimes.map(it => it.interval.timeInterval),
            weekDay,
            time
        );
    }
}
