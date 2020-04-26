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

import { AppComponent } from "./app.component";
import { ConfigurationService } from "./configuration.service";
import { GeocoderService } from "./geocoder.service";
import { HammerProvider } from "./hammer-provider";
import { I18nProvider } from "./i18n-provider";
import { I18nService } from "./i18n.service";
import { LocalStorageService } from "./local-storage.service";
import { LocationService } from "./location.service";
import { OpeningTimesService } from "./opening-times.service";
import { AboutComponent } from "./pages/about/about.component";
import { GoogleMapComponent } from "./pages/main/google-map/google-map.component";
import { AddressComponent } from "./pages/main/info-box/address/address.component";
import { InfoBoxComponent } from "./pages/main/info-box/info-box.component";
import { ShareLinkComponent } from "./pages/main/info-box/share-link/share-link.component";
import { KilometerPipe } from "./pages/main/kilometer.pipe";
import { MainComponent } from "./pages/main/main.component";
import { ResultsListComponent } from "./pages/main/results-list/results-list.component";
import { GeolocationComponent } from "./pages/main/search/geolocation/geolocation.component";
import { PlaceSelectComponent } from "./pages/main/search/geolocation/place-select/place-select.component";
import { SearchComponent } from "./pages/main/search/search.component";
import { SortComponent } from "./pages/main/sort/sort.component";
import { StatisticsComponent } from "./pages/main/statistics/statistics.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { SearchService } from "./search.service";
import { HeaderComponent } from "./shared-components/header/header.component";
import { NewIndicatorComponent } from "./shared-components/new-indicator/new-indicator.component";
import { TextClearComponent } from "./shared-components/text-clear/text-clear.component";

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
