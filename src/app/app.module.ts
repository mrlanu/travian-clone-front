import {NgModule} from '@angular/core';
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
import {BuildingConfirmComponent} from './modals/building-confirm/building-confirm.component';
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
import { RallyPointComponent } from './village/building-details/rally-point/rally-point.component';
import { BuildingDetailsContainerComponent } from './village/building-details/building-details-container/building-details-container.component';
import { MilitaryUnitComponent } from './village/building-details/rally-point/military-unit/military-unit.component';
import { HomeArmyComponent } from './village/home-army/home-army.component';
import { TroopsSendComponent } from './village/building-details/rally-point/troops-send/troops-send.component';
import { ConfirmTroopsSendComponent } from './village/building-details/rally-point/troops-send/confirm-troops-send/confirm-troops-send.component';
import {MilitaryUnitContractComponent} from "./village/building-details/rally-point/military-unit-contract/military-unit-contract.component";
import { MapComponent } from './village/map/map.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { TileDetailComponent } from './village/map/tile-detail/tile-detail.component';
import { TroopMovementsComponent } from './village/troop-movements/troop-movements.component';

@NgModule({
  declarations: [
    AppComponent,
    VillageComponent,
    FieldsComponent,
    StorageComponent,
    ProducePerHourComponent,
    TaskListComponent,
    LanuCountdownComponent,
    BuildingConfirmComponent,
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
    MilitaryUnitComponent,
    MilitaryUnitContractComponent,
    HomeArmyComponent,
    TroopsSendComponent,
    ConfirmTroopsSendComponent,
    MapComponent,
    TileDetailComponent,
    TroopMovementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
