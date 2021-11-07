import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FieldsComponent} from "./village/fields/fields.component";
import {VillageComponent} from "./village/village.component";
import {BuildingsComponent} from "./village/buildings/buildings.component";
import {BuildingDetailsComponent} from "./village/building-details/building-details.component";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";

const routes: Routes = [
  {path: 'welcome-page', component: WelcomePageComponent},
  {path: 'villages/:village-id', component: VillageComponent, children: [
      {path: 'fields', component: FieldsComponent},
      {path: 'fields/:position', component: BuildingDetailsComponent},
      {path: 'buildings', component: BuildingsComponent}
    ]}
  /*{path: 'welcome-page', component: WelcomePageComponent},
  {path: 'main', component: MainComponent, canActivateChild: [AuthGuard], children: [
      {path: 'charts/income-vs-expenses', component: BarChartComponent},
      {path: 'charts/spent-by-category', component: LineChartComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'debt-payoff-planner', component: DebtPayoffComponent},
      {path: 'user-details', component: UserDetailsComponent},
      /!*{path: 'charts', component: ChartsComponent},
      {path: 'budgets', component: BudgetsComponent},
      {path: 'accounts', component: AccountsComponent},
      {path: 'categories', component: CategoriesComponent}*!/
    ]}*/,
  {path: '**', redirectTo: '/welcome-page'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
