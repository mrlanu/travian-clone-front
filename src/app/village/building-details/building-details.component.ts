import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Utils} from "../../shared/utils";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {redirectAfterBuilding, upgradeBuilding} from "../store/settlement.actions";

export interface BuildingView {
  position: number;
  level: number;
  name: string;
  production: number;
  underUpgrade: boolean;
  ableToUpgrade: boolean;
  maxLevel: number;
  description: string;
  timeToNextLevel: number;
  resourcesToNextLevel: Map<string, number>;
  capacity: number;
  timeReduction: number;
}

@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.css', '../../shared/resources.css']
})
export class BuildingDetailsComponent implements OnInit {

  @Input() buildingView!: BuildingView;

  componentSubs: Subscription[] = [];

  constructor(private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {

  }

  public formatTime(timeSeconds: number): string {
    return Utils.formatTime(timeSeconds);
  }

  onUpgradeClick(){
    this.store.dispatch(upgradeBuilding({position: this.buildingView.position}));
    this.store.dispatch(redirectAfterBuilding());

    /*this.villageService.upgradeField(villageId, this.buildingView.position!).subscribe(resp => {
      this.store.dispatch(fetchSettlement({id: villageId}));
      this.router.navigate(['/villages', villageId, 'fields']);
    }, error => {
      this.uiService.showSnackbar('Error occurred', null, 4000);
      this.router.navigate(['/villages', villageId, 'fields']);
    });*/
  }

}
