import { Component, Inject, Input } from "@angular/core";

import { I18N } from "../i18n-provider";
import { LocalStorageService } from "../local-storage.service";
import { Location } from "../model/location";

@Component({
    selector: "app-new-indicator",
    template: `<span *ngIf="isNew">{{i18n.features.isNew}}</span>`,
    styleUrls: ["new-indicator.component.scss"],
})
export class NewIndicatorComponent {

    constructor(
        @Inject(I18N) readonly i18n: any,
        private readonly localStorageService: LocalStorageService,
    ) { }

    @Input() location?: Location;

    get isNew(): boolean {
        return !!this.location
            && this.location.hasBeenCreatedInLastMonths(this.localStorageService.settings.monthsNew);
    }
}
