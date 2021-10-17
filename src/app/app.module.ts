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

@NgModule({
  declarations: [
    AppComponent,
    VillageComponent,
    FieldsComponent,
    StorageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CountdownModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
