import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { ConfigurationService } from "./configuration.service";
import { GeolocationComponent } from "./geolocation/geolocation.component";
import { GoogleMapComponent } from "./google-map/google-map.component";
import { HeaderComponent } from "./header/header.component";
import { I18nService } from "./i18n.service";
import { InfoWindowViewService } from "./info-window-view.service";
import { KilometerPipe } from "./kilometer.pipe";
import { LocationService } from "./location.service";
import { MainComponent } from "./main/main.component";
import { OpeningTimesService } from "./opening-times.service";
import { PlaceSelectComponent } from "./place-select/place-select.component";
import { ResultsListComponent } from "./results-list/results-list.component";
import { SearchComponent } from "./search/search.component";
import { SearchService } from "./search.service";
import { SortComponent } from "./sort/sort.component";
import { StatisticsComponent } from "./statistics/statistics.component";

const appRoutes: Routes = [
    { path: "gastro", component: MainComponent },
    { path: "shopping", component: MainComponent },
    { path: "**", redirectTo: "gastro" },
];

@NgModule({
    declarations: [
        AppComponent,
        GeolocationComponent,
        GoogleMapComponent,
        HeaderComponent,
        KilometerPipe,
        MainComponent,
        PlaceSelectComponent,
        ResultsListComponent,
        SearchComponent,
        SortComponent,
        StatisticsComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
    ],
    providers: [
        ConfigurationService,
        I18nService,
        InfoWindowViewService,
        LocationService,
        OpeningTimesService,
        SearchService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
