import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {VillageComponent} from './village/village.component';
import {FieldsComponent} from './village/fields/fields.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {StorageComponent} from './village/storage/storage.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {ProducePerHourComponent} from './village/produce-per-hour/produce-per-hour.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {TaskListComponent} from './village/task-list/task-list.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LanuCountdownComponent} from './shared/lanu-countdown/lanu-countdown.component';
import {BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {BuildingsComponent} from './village/buildings/buildings.component';
import {HeaderComponent} from './village/header/header.component';
import {BuildingDetailsComponent} from './village/building-details/building-details.component';
import {SignupComponent} from './auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {LoginComponent} from "./auth/login/login.component";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ActiveVillageComponent} from './village/active-village/active-village.component';
import {VillagesListComponent} from './village/villages-list/villages-list.component';
import {AllBuildingsListComponent} from "./village/all-buildings-list/all-buildings-list.component";
import {BuildingItemComponent} from "./village/all-buildings-list/building-item/building-item.component";
import {TabsModule} from "ngx-bootstrap/tabs";
import {BarracksComponent} from './village/building-details/barracks/barracks.component';
import {CombatUnitComponent} from './village/building-details/barracks/combat-unit/combat-unit.component';
import {RallyPointComponent} from './village/building-details/rally-point/rally-point.component';
import {
  BuildingDetailsContainerComponent
} from './village/building-details/building-details-container/building-details-container.component';
import {CombatGroupComponent} from './village/building-details/rally-point/combat-group/combat-group.component';
import {HomeArmyComponent} from './village/home-army/home-army.component';
import {TroopsSendComponent} from './village/building-details/rally-point/troops-send/troops-send.component';
import {
  ConfirmTroopsSendComponent
} from './village/building-details/rally-point/troops-send/confirm-troops-send/confirm-troops-send.component';
import {
  MilitaryUnitContractComponent
} from "./village/building-details/rally-point/military-unit-contract/military-unit-contract.component";
import {MapComponent} from './village/map/map.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {TileDetailComponent} from './village/map/tile-detail/tile-detail.component';
import {TroopMovementsBriefComponent} from './village/troop-movements-brief/troop-movements-brief.component';
import {StoreModule} from "@ngrx/store";
import {appReducer} from "./store/app.reducer";
import {EffectsModule} from "@ngrx/effects";
import {SettlementEffects} from "./village/store/settlement.effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { ReportsComponent } from './village/reports/reports.component';
import { ReportsListComponent } from './village/reports/reports-list/reports-list.component';
import { ReportComponent } from './village/reports/report/report.component';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    VillageComponent,
    FieldsComponent,
    StorageComponent,
    ProducePerHourComponent,
    TaskListComponent,
    LanuCountdownComponent,
    BuildingsComponent,
    HeaderComponent,
    BuildingDetailsComponent,
    SignupComponent,
    LoginComponent,
    WelcomePageComponent,
    ActiveVillageComponent,
    VillagesListComponent,
    AllBuildingsListComponent,
    BuildingItemComponent,
    BarracksComponent,
    CombatUnitComponent,
    RallyPointComponent,
    BuildingDetailsContainerComponent,
    CombatGroupComponent,
    MilitaryUnitContractComponent,
    HomeArmyComponent,
    TroopsSendComponent,
    ConfirmTroopsSendComponent,
    MapComponent,
    TileDetailComponent,
    TroopMovementsBriefComponent,
    ReportsComponent,
    ReportsListComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ProgressbarModule,
    FontAwesomeModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatGridListModule,
    TabsModule.forRoot(),
    EffectsModule.forRoot([SettlementEffects]),
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
