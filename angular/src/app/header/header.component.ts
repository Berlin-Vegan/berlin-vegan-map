import { Component, EventEmitter, Input, Output } from "@angular/core";

import { I18nService } from "../i18n.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: [ "./header.component.scss" ],
})
export class HeaderComponent {

    constructor(readonly i18nService: I18nService) { }

    @Input() fullMapView: boolean;
    @Output() readonly searchClick = new EventEmitter<void>();
    @Output() readonly fullMapViewClick = new EventEmitter<void>();

    readonly i18n = this.i18nService.getI18n();
    readonly language = this.i18nService.getLanguage();
}
