import { Component, EventEmitter, Input, Output } from "@angular/core";

import { I18nService } from "../i18n.service";
import { LocalStorageService } from "../local-storage.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: [ "./header.component.scss" ],
})
export class HeaderComponent {

    constructor(
        readonly localStorageService: LocalStorageService,
        private readonly i18nService: I18nService,
    ) { }

    @Input() searchButtonIsDisabled = true;
    @Input() fullMapViewButtonIsDisabled = true;
    @Output() readonly searchClick = new EventEmitter<void>();
    @Output() readonly fullMapViewClick = new EventEmitter<void>();

    readonly i18n = this.i18nService.getI18n();
    readonly language = this.localStorageService.getLanguage();
}
