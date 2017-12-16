import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { ConfigurationService } from "../configuration.service";
import { GastroLocation } from "../model/gastro-location";
import { I18nService } from "../i18n.service";
import { Location } from "../model/location";
import { ResourcesService } from "../resources.service";

declare var JsCommon: () => void; // TODO
const jsCommon = new JsCommon();

@Component({
    selector: "app-results-list",
    templateUrl: "./results-list.component.html",
})
export class ResultsListComponent implements OnInit {

    constructor(
        private readonly configurationService: ConfigurationService,
        private readonly i18nService: I18nService,
        private readonly resourcesService: ResourcesService,
    ) { }

    @Input() locations: GastroLocation[];
    @Input() geoPosition; // TODO: Type
    @Output() readonly locationSelect = new EventEmitter<Location>();

    readonly i18n = this.i18nService.getI18n();
    readonly expandOpenComments = new Map<Location, boolean>();

    ngOnInit() {
        for (const location of this.locations) {
            this.expandOpenComments.set(location, false);
        }
    }

    getMarkerImageUrl(location: Location) {
        return this.resourcesService.getDotImageUrl(this.configurationService.getColor(location.getVeganCategory()));
    }

    makeVisible(location: GastroLocation | null) {
        const locationElement = document.getElementById(location.id); // TODO

        if (!jsCommon.domUtil.isElementVisible(locationElement)) {
            locationElement.scrollIntoView();
        }
    }
}
