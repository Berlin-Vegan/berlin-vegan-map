import { Component, EventEmitter, Input, NgZone, OnInit, Output } from "@angular/core";

import { I18nService } from "../i18n.service";
import { ConfigurationService } from "../configuration.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: [ "./header.component.scss" ],
})
export class HeaderComponent implements OnInit {

    constructor(
        private readonly configurationService: ConfigurationService,
        readonly i18nService: I18nService,
        private readonly ngZone: NgZone,
    ) { }

    @Input() fullMapView = false;
    @Input() showingSettings = false;
    @Output() readonly searchClick = new EventEmitter<void>();
    @Output() readonly fullMapViewClick = new EventEmitter<void>();

    readonly i18n = this.i18nService.getI18n();
    readonly language = this.i18nService.getLanguage();
    mobileAppText = "";
    reportNewLocationText = "";
    reportProblemText = "";

    ngOnInit(): void {
        const mediaQueryList = window.matchMedia(this.configurationService.mediaQueries["min-width-1"]);
        this.setTexts(mediaQueryList.matches);
        mediaQueryList.addListener(listener => this.ngZone.run(() => this.setTexts(listener.matches)));
    }

    private setTexts(long: boolean) {
        const mode = long ? "long" : "short";
        this.mobileAppText = this.getText("mobileApp", mode);
        this.reportNewLocationText = this.getText("reportNewLocation", mode);
        this.reportProblemText = this.getText("reportProblem", mode);
    }

    private getText(key: string, mode: "long" | "short"): string {
        return nonBreakingSpaces(this.i18n.header[key][mode]);
    }
}

// TODO: Move to library
function nonBreakingSpaces(s: string): string {
    const nbsp = "\xa0"; // Non-breaking space
    return s.replace(" ", nbsp);
}
