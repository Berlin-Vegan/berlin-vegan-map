import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DomUtil } from "@marco-eckstein/js-utils";

import { ConfigurationService } from "../configuration.service";
import { I18nService } from "../i18n.service";
import { Location } from "../model/location";
import { LocalStorageService } from "../local-storage.service";

@Component({
    selector: "app-results-list",
    templateUrl: "./results-list.component.html",
    styleUrls: [ "./results-list.component.scss" ],
})
export class ResultsListComponent implements OnInit {

    constructor(
        readonly configurationService: ConfigurationService,
        private readonly localStorageService: LocalStorageService,
        private readonly i18nService: I18nService,
    ) { }

    @Input() locations: Location[];
    @Input() coordinates: Coordinates | null;
    @Output() readonly locationSelect = new EventEmitter<Location>();
    @Output() readonly locationCenter = new EventEmitter<Location>();

    readonly i18n = this.i18nService.getI18n();
    readonly expandOpenComments = new Map<Location, boolean>();

    ngOnInit() {
        for (const location of this.locations) {
            this.expandOpenComments.set(location, false);
        }
    }

    makeVisible(location: Location) {
        const locationElement = document.getElementById(location.id)!; // TODO

        if (!DomUtil.isElementVisible(locationElement)) {
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
