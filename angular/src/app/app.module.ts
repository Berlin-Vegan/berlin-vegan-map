/// <reference types="@types/googlemaps"/>

import "./init";
// tslint:disable-next-line:ordered-imports
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { BrowserModule, HammerModule } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";
import { NgxGalleryModule } from "@kolkov/ngx-gallery";
import { ExternalHRefModule } from "@marco-eckstein/angular-lib-common";

import { environment } from "../environments/environment";

import { AboutComponent } from "./about/about.component";
import { AddressComponent } from "./address/address.component";
import { AppComponent } from "./app.component";
import { ConfigurationService } from "./config/configuration.service";
import { GeocoderService } from "./geocoder.service";
import { GeolocationComponent } from "./geolocation/geolocation.component";
import { GoogleMapComponent } from "./google-map/google-map.component";
import { HammerProvider } from "./hammer-provider";
import { HeaderComponent } from "./header/header.component";
import { I18nProvider } from "./i18n-provider";
import { I18nService } from "./i18n.service";
import { InfoBoxComponent } from "./info-box/info-box.component";
import { KilometerPipe } from "./kilometer.pipe";
import { LocalStorageService } from "./local-storage.service";
import { LocationService } from "./location.service";
import { MainComponent } from "./main/main.component";
import { NewIndicatorComponent } from "./new-indicator/new-indicator.component";
import { OpeningTimesService } from "./opening-times.service";
import { PlaceSelectComponent } from "./place-select/place-select.component";
import { ResultsListComponent } from "./results-list/results-list.component";
import { SearchService } from "./search.service";
import { SearchComponent } from "./search/search.component";
import { SettingsComponent } from "./settings/settings.component";
import { ShareLinkComponent } from "./share-link/share-link.component";
import { SortComponent } from "./sort/sort.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { TextClearComponent } from "./text-clear/text-clear.component";

const appRoutes: Routes = [
    { path: "gastro", component: MainComponent },
    { path: "shops", component: MainComponent },
    { path: "about", component: AboutComponent },
    { path: "settings", component: SettingsComponent },
    { path: "shopping", redirectTo: "shops" }, // Legacy
    { path: "**", redirectTo: "gastro" },
].filter(it => environment.shoppingLocationsUrl || !it.path.startsWith("shop"));

@NgModule({
    declarations: [
        AboutComponent,
        AddressComponent,
        AppComponent,
        GeolocationComponent,
        GoogleMapComponent,
        HeaderComponent,
        InfoBoxComponent,
        KilometerPipe,
        MainComponent,
        NewIndicatorComponent,
        PlaceSelectComponent,
        ResultsListComponent,
        SearchComponent,
        SettingsComponent,
        ShareLinkComponent,
        SortComponent,
        StatisticsComponent,
        TextClearComponent,
    ],
    imports: [
        BrowserModule,
        ExternalHRefModule.forRoot({
            isExternalHRef: isExternalHRef,
            externalHRefTargetDefaultsToBlank: true,
            safeBlankRelTokens: ["noopener"],
        }),
        FormsModule,
        HammerModule,
        HttpClientModule,
        MatMenuModule,
        NgxGalleryModule,
        RouterModule.forRoot(appRoutes),
        ServiceWorkerModule.register("./ngsw-worker.js", { enabled: environment.production }),
        NoopAnimationsModule,
    ],
    providers: [
        ConfigurationService,
        GeocoderService,
        HammerProvider,
        I18nProvider,
        I18nService,
        LocationService,
        LocalStorageService,
        OpeningTimesService,
        SearchService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

export function isExternalHRef(href: string): boolean {
    return href.startsWith("http://") || href.startsWith("https://");
}
