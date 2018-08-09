import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

import { DayOfWeek, NavigatorUtil } from "@marco-eckstein/js-utils";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from "ngx-gallery";

import { I18nService } from "../i18n.service";
import { LocalStorageService } from "./../local-storage.service";
import { Location } from "../model/location";
import { ConfigurationService } from "../configuration.service";

@Component({
    selector: "app-info-box",
    templateUrl: "info-box.component.html",
    styleUrls: [ "info-box.component.scss" ]
})
export class InfoBoxComponent implements OnChanges {

    constructor(
        private readonly configurationService: ConfigurationService,
        private readonly localStorageService: LocalStorageService,
        private readonly i18nService: I18nService,
    ) { }

    @Input() location: Location;
    @Input() coordinates: Coordinates | null;

    @Output() centerLocation = new EventEmitter<void>();
    @Output() close = new EventEmitter<void>();

    readonly i18n = this.i18nService.getI18n();
    readonly isPhone = NavigatorUtil.isPhone();
    private readonly extraLongHyphen = "–"; // Your editor may display this as a regular hyphen.
    galleryOptions: NgxGalleryOptions[] = [
        {
            height: "29.5vh",
            width: "100%",
            thumbnailsMargin: 3,
            thumbnailMargin: 3,
            imageAnimation: NgxGalleryAnimation.Slide,
            previewKeyboardNavigation: true,
            previewSwipe: true,
            previewAnimation: false,
            previewZoom: true,
            previewDownload: true,
            previewCloseOnClick: true,
            previewCloseOnEsc: true,
        },
        {
            breakpoint: this.configurationService.minWidths[2] - 1,
            thumbnailsMargin: 2,
            thumbnailMargin: 2,
        },
        {
            breakpoint: this.configurationService.minWidths[3] - 1,
            thumbnailsMargin: 3,
            thumbnailMargin: 3,
            height: "40vh",
        },
        {
            breakpoint: this.configurationService.minWidths[6] - 1,
            thumbnailsMargin: 2,
            thumbnailMargin: 2,
        },
    ];
    galleryImages: NgxGalleryImage[] | null = null;

    get openingTimesInnerHtml(): string {

        let html = "";
        const compressedOts = this.location.openingTimes.getCompressed();

        for (let i = 0; i < compressedOts.length; i++) {

            const group = compressedOts[i];
            const firstOt = group[0];
            const lastOt = group[group.length - 1];
            const interval = firstOt.interval.friendly;
            const days =
                firstOt.friendlyDayShort
                + (firstOt === lastOt ? `` : this.extraLongHyphen + lastOt.friendlyDayShort);

            const groupContainsToday =
                group.map(ot => ot.dayIndex).indexOf(new Date().getDay() as DayOfWeek) >= 0;
            html += `<b>${days}:</b> ` + (groupContainsToday ? `<b>${interval}</b>` : interval);

            if (i < compressedOts.length - 1) {
                html += `<br/>`;
            }
        }

        return html;
    }

    get commentAndReviewInnerHtml(): string {
        return this.i18nService.getLanguage() === "en" ?
            (this.location.commentEnglish ? `${this.location.commentEnglish}<br/>` : ``)
            + (this.location.reviewURL ? this.reviewAnchor : ``)
            :
            (this.location.reviewURL ? this.reviewAnchor : this.location.comment || ``);
    }

    private get reviewAnchor(): string {
        return `<a target="_blank" rel="noopener" href="${this.location.reviewURL}">`
            + `${this.i18n.infoWindow.review}</a>`;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["location"] && this.localStorageService.settings.showPictures) {
            this.galleryImages =
                this.location.pictures.length > 0 ?
                this.location.pictures
                    .map(it => it.url)
                    .map(it => it.replace("http://", "https://")) // TODO: Remove when replaced on server.
                    .map(it => ({ small: it, medium: it, big: it }))
                :
                null;
        }
    }
}
