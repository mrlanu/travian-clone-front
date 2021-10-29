import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VillageComponent } from './village/village.component';
import { FieldsComponent } from './village/fields/fields.component';
import {HttpClientModule} from "@angular/common/http";
import {CountdownModule} from "ngx-countdown";
import { StorageComponent } from './village/storage/storage.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { ProducePerHourComponent } from './village/produce-per-hour/produce-per-hour.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import { TaskListComponent } from './village/task-list/task-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LanuCountdownComponent } from './shared/lanu-countdown/lanu-countdown.component';
import { BuildingConfirmComponent } from './modals/building-confirm/building-confirm.component';
import {ModalModule} from "ngx-bootstrap/modal";
import { BuildingsComponent } from './village/buildings/buildings.component';
import { HeaderComponent } from './village/header/header.component';

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
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CountdownModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ProgressbarModule,
    FontAwesomeModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
