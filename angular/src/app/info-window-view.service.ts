import { Injectable } from "@angular/core";
import { DayOfWeek } from "@marco-eckstein/js-utils";

import { I18nService } from "./i18n.service";
import { KilometerPipe } from "./kilometer.pipe";
import { Location } from "./model/location";

const extraLongHyphen = "–"; // Your editor may display this as a regular hyphen.
const linkSymbol = "🔗"; // Your editor may not have this.

@Injectable()
export class InfoWindowViewService {

    private readonly language: string;
    private readonly i18n: any; // TODO: Type
    private readonly kilometerPipe = new KilometerPipe(this.i18nService);

    constructor(private readonly i18nService: I18nService) {
        this.language = i18nService.getLanguage();
        this.i18n = i18nService.getI18n();
    }

    getContent(location: Location, coordinates: Coordinates | null, mode: "full" | "minimal") {
        return mode === "full" ?
            "<article class='infoWindow'>"
            + "<header class='flex-container-nowrap'>"
            + "<h1>" + location.name + "</h1>"
            + (location.website ?
                "<a target='_blank' href='" + location.website + "' title='" + location.website + "'>" + linkSymbol + "</a>"
                :
                ""
            )
            + "</header>"
            + "<p>" + location.tagsFriendly + " (" + this.i18n.enums.veganCategory.verbose[location.veganCategory] + ")</p>"
            + "<p>" + location.address + "</p>"
            + (coordinates ?
                "<p>" + this.i18n.infoWindow.distance + ": "
                + this.kilometerPipe.transform(location.getDistanceToCoordinatesInKm(coordinates))
                + "</p>"
                :
                "")
            + (location.telephone ? "<p>" + this.i18n.infoWindow.phone + ": " + location.telephone + "</p>" : "")
            + "<h2>" + this.i18n.infoWindow.openingTimes + "</h2>"
            + "<p>" + this.getOpeningTimesInnerHtml(location) + "</p>"
            + this.getOpenCommentInnerHtml(location)
            + "<p>" + this.getCommentAndReviewInnerHtml(location) + "</p>"
            + "</article>"
            :
            "<h2>" + location.name + "</h2>";
    }

    private getOpeningTimesInnerHtml(location: Location): string {

        let html = "";
        const compressedOts = location.openingTimes.getCompressed();

        for (let i = 0; i < compressedOts.length; i++) {

            const group = compressedOts[i];
            const firstOt = group[0];
            const lastOt = group[group.length - 1];
            const interval = firstOt.interval.friendly;
            const days = firstOt.friendlyDayShort + (firstOt === lastOt ? "" : extraLongHyphen + lastOt.friendlyDayShort);

            const groupContainsToday = group.map(ot => ot.dayIndex).indexOf(new Date().getDay() as DayOfWeek) >= 0;
            html += "<b>" + days + ":</b> " + (groupContainsToday ? "<b>" + interval + "</b>" : interval);

            if (i < compressedOts.length - 1) {
                html += "<br/>";
            }
        }

        return html;
    }

    private getOpenCommentInnerHtml(location: Location): string {
        const openComment = location.localizedOpenComment;
        return openComment ? "<p>" + openComment + "</p>" : "";
    }

    private getCommentAndReviewInnerHtml(location: Location): string {
        return this.language === "en" ?
            (location.commentEnglish ? location.commentEnglish + "<br/>" : "")
            + (location.reviewURL ? this.getReviewAnchor(location) : "")
            :
            (location.reviewURL ? this.getReviewAnchor(location) : location.comment || "");
    }

    private getReviewAnchor(location: Location): string {
        return "<a target='_blank' href='" + location.reviewURL + "'>" + this.i18n.infoWindow.review + "</a>";
    }
}
