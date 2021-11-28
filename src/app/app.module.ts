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
import {ModalModule} from "ngx-bootstrap/modal";
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
import {CombatUnitComponent} from './village/building-details/barracks/military-unit/combat-unit.component';
import { RallyPointComponent } from './village/building-details/rally-point/rally-point.component';
import { BuildingDetailsContainerComponent } from './village/building-details/building-details-container/building-details-container.component';
import { MilitaryUnitComponent } from './village/building-details/rally-point/troops-detail-item/military-unit.component';
import { HomeArmyComponent } from './village/home-army/home-army.component';

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
    HomeArmyComponent
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
    TabsModule.forRoot(),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
