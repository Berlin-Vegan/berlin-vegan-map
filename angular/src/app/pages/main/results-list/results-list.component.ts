import { Component, EventEmitter, Inject, Input, OnInit, Output } from "@angular/core";
import { BrowserUtil } from "@marco-eckstein/js-utils";

import { ConfigurationService } from "../../../configuration.service";
import { I18N } from "../../../i18n-provider";
import { LocalStorageService } from "../../../local-storage.service";
import { Location } from "../../../model/location";

@Component({
    selector: "app-results-list",
    templateUrl: "./results-list.component.html",
    styleUrls: ["./results-list.component.scss"],
})
export class ResultsListComponent implements OnInit {

    constructor(
        @Inject(I18N) readonly i18n: any,
        readonly configurationService: ConfigurationService,
        private readonly localStorageService: LocalStorageService,
    ) { }

    @Input() locations: Location[];
    @Input() coordinates: Coordinates | undefined;
    @Output() readonly locationSelect = new EventEmitter<Location>();
    @Output() readonly locationCenter = new EventEmitter<Location>();

    readonly expandOpenComments = new Map<Location, boolean>();

    ngOnInit() {
        for (const location of this.locations) {
            this.expandOpenComments.set(location, false);
        }
    }

    makeVisible(location: Location) {
        const locationElement = document.getElementById(location.id)!; // TODO

        if (!BrowserUtil.isElementVisible(locationElement)) {
            locationElement.scrollIntoView();
        }
    }

    onLocationClick(location: Location) {
        if (this.localStorageService.settings.clickInListCentersLocation) {
            this.locationCenter.emit(location);
        } else {
            this.locationSelect.emit(location);
        }
    }
}
