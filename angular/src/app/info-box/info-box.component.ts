import { AfterContentChecked, Component, EventEmitter, Input, Output } from "@angular/core";

import { InfoWindowViewService } from "../info-window-view.service";
import { Location } from "../model/location";

@Component({
    selector: "app-info-box",
    templateUrl: "info-box.component.html",
    styleUrls: [ "info-box.component.scss" ]
})
export class InfoBoxComponent implements AfterContentChecked {

    constructor(private readonly infoWindowViewService: InfoWindowViewService) { }

    @Input() location: Location;
    @Input() coordinates: Coordinates | null;

    @Output() close = new EventEmitter<void>();

    innerhtml: string;

    ngAfterContentChecked() {
        this.innerhtml = this.infoWindowViewService.getContent(this.location, this.coordinates);
    }
}
