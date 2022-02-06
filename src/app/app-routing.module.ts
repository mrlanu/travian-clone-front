import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FieldsComponent} from "./village/fields/fields.component";
import {VillageComponent} from "./village/village.component";
import {BuildingsComponent} from "./village/buildings/buildings.component";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./auth/auth.guard";
import {AllBuildingsListComponent} from "./village/all-buildings-list/all-buildings-list.component";
import {RallyPointComponent} from "./village/building-details/rally-point/rally-point.component";
import {BuildingDetailsContainerComponent} from "./village/building-details/building-details-container/building-details-container.component";
import {MapComponent} from "./village/map/map.component";

const routes: Routes = [
  {path: 'welcome-page', component: WelcomePageComponent, children: [
      {path: 'signup', component: SignupComponent},
      {path: 'login', component: LoginComponent}
    ]},
  {path: 'villages/:village-id', component: VillageComponent, canActivate: [AuthGuard], children: [
      {path: 'fields', component: FieldsComponent},
      {path: 'fields/:position', component: BuildingDetailsContainerComponent},
      {path: 'buildings', component: BuildingsComponent},
      {path: 'buildings/:position/new', component: AllBuildingsListComponent},
      {path: 'buildings/:position/Rally-point', component: RallyPointComponent},
      {path: 'buildings/:position/:name', component: BuildingDetailsContainerComponent},
      {path: 'map', component: MapComponent},
    ]},
  {path: '**', redirectTo: '/welcome-page/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
