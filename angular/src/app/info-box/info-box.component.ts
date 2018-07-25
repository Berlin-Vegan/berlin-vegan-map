import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

import { I18nService } from "../i18n.service";
import { InfoWindowViewService } from "../info-window-view.service";
import { Location } from "../model/location";

@Component({
    selector: "app-info-box",
    templateUrl: "info-box.component.html",
    styleUrls: [ "info-box.component.scss" ]
})
export class InfoBoxComponent implements OnChanges {

    constructor(
        private readonly i18nService: I18nService,
        private readonly infoWindowViewService: InfoWindowViewService
    ) { }

    @Input() location: Location;
    @Input() coordinates: Coordinates | null;

    @Output() close = new EventEmitter<void>();

    i18n = this.i18nService.getI18n();
    innerhtml: string;

    ngOnChanges() {
        this.innerhtml = this.infoWindowViewService.getContent(this.location, this.coordinates, "full");
    }
}
