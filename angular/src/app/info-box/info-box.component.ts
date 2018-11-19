import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { DayOfWeek, NavigatorUtil } from "@marco-eckstein/js-utils";
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from "ngx-gallery";

import { ConfigurationService } from "../configuration.service";
import { I18N } from "../i18n-provider";
import { Location } from "../model/location";
import { Place } from "../model/place";

import { LocalStorageService } from "./../local-storage.service";

@Component({
    selector: "app-info-box",
    templateUrl: "info-box.component.html",
    styleUrls: [ "info-box.component.scss" ]
})
export class InfoBoxComponent implements OnChanges {

    constructor(
        @Inject(I18N) readonly i18n: any,
        private readonly configurationService: ConfigurationService,
        private readonly localStorageService: LocalStorageService,
    ) { }

    @Input() location: Location;
    @Input() place: Place | undefined;

    @Output() readonly centerLocation = new EventEmitter<void>();
    // tslint:disable-next-line:no-output-named-after-standard-event
    @Output() readonly close = new EventEmitter<void>();

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

    get comment(): string | undefined {
        return this.location.getLocalizedComment(this.localStorageService.getLanguage());
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
