import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatMenuModule } from "@angular/material/menu";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";

import { NgxGalleryModule } from "ngx-gallery";

import { environment } from "../environments/environment";

import { AboutComponent } from "./about/about.component";
import { AddressComponent } from "./address/address.component";
import { AppComponent } from "./app.component";
import { ConfigurationService } from "./configuration.service";
import { GeolocationComponent } from "./geolocation/geolocation.component";
import { GoogleMapComponent } from "./google-map/google-map.component";
import { HammerProvider } from "./hammer-provider";
import { HeaderComponent } from "./header/header.component";
import { I18nService } from "./i18n.service";
import { InfoBoxComponent } from "./info-box/info-box.component";
import { KilometerPipe } from "./kilometer.pipe";
import { LocalStorageService } from "./local-storage.service";
import { LocationService } from "./location.service";
import { MainComponent } from "./main/main.component";
import { OpeningTimesService } from "./opening-times.service";
import { PlaceSelectComponent } from "./place-select/place-select.component";
import { ResultsListComponent } from "./results-list/results-list.component";
import { SearchComponent } from "./search/search.component";
import { SearchService } from "./search.service";
import { SettingsComponent } from "./settings/settings.component";
import { SortComponent } from "./sort/sort.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const appRoutes: Routes = [
    { path: "gastro", component: MainComponent },
    { path: "shopping", component: MainComponent },
    { path: "settings", component: SettingsComponent },
    { path: "**", redirectTo: "gastro" },
];

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
        PlaceSelectComponent,
        ResultsListComponent,
        SearchComponent,
        SettingsComponent,
        SortComponent,
        StatisticsComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatExpansionModule,
        MatMenuModule,
        NgxGalleryModule,
        RouterModule.forRoot(appRoutes),
        ServiceWorkerModule.register("./ngsw-worker.js", { enabled: environment.production }),
        BrowserAnimationsModule,
    ],
    providers: [
        ConfigurationService,
        I18nService,
        LocalStorageService,
        LocationService,
        OpeningTimesService,
        SearchService,
        HammerProvider,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
