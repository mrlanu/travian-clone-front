import {Component, OnInit, ViewChild} from '@angular/core';
import {skip, take} from "rxjs/operators";
import {VillageService} from "../../../services/village.service";
import {BuildingView} from "../building-details.component";
import {TabsetComponent} from "ngx-bootstrap/tabs";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../store/app.reducer";
import {combatGroupsSelector, settlementSelector} from "../../store/settlement.selectors";
import {CombatGroup} from "./combat-group/combat-group.component";
import {fetchCombatGroups, fetchSettlement} from "../../store/settlement.actions";

export class CombatGroupSendingRequest {
  constructor(public targetSettlementId: string,
              public mission: string, public waves: WaveModels[]) {
  }
}

export interface CombatGroupsMap {
  HOME: CombatGroup[],
  IN: CombatGroup[],
  OUT: CombatGroup[],
  AWAY: CombatGroup[],
}

export interface WaveModels {
  troops: number[];
  firstTarget: number;
  firstTargetText: string;
  secondTarget: number;
  secondTargetText: string;
}

export interface HomeLegion {
  villageId: string;
  units: number[];
  nation: string;
}

export class CombatGroupSendingContract {
  constructor(
    public id: string,
    public savedEntityId: string,
    public move: boolean,
    public mission: string,
    public targetVillageId: string,
    public targetVillageName: string,
    public targetPlayerName: string,
    public targetVillageCoordinates: number[],
    public units: number[],
    public arrivalTime: null | Date,
    public duration: number,
  ) {
  }
}

@Component({
  selector: 'app-rally-point',
  templateUrl: './rally-point.component.html',
  styleUrls: ['./rally-point.component.css']
})
export class RallyPointComponent implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  villageId: string | undefined;
  buildingView: BuildingView | undefined;
  homeLegion: HomeLegion = {
    villageId: '',
    units: [0,0,0,0,0,0,0,0,0,0,0],
    nation: 'GALLS'
  };
  militaryUnitList: CombatGroupsMap | undefined;

  constructor(private villageService: VillageService, private route: ActivatedRoute,
              private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {
    this.store.select(settlementSelector).pipe(skip(1)).subscribe(settlement => {
      this.getRallyPointBuildingFromCurrentVillage();
    });
    this.store.dispatch(fetchSettlement());
    setTimeout(()=>{this.selectTab(this.route.snapshot.queryParams.tab)}, 100);
    this.store.select(combatGroupsSelector).subscribe(groups => {
      this.militaryUnitList = groups;
    });
  }

  onSendingSelect(){
    this.getAllCombatGroups(false);
  }

  onOverviewSelected(){
    this.getAllCombatGroups(false);
  }

  selectTab(tabId: number) {
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }

  onCountDone(){
    this.getAllCombatGroups(false);
  }

  private getRallyPointBuildingFromCurrentVillage() {
    this.store.select(settlementSelector).pipe(take(1)).subscribe(
      village => {
        this.villageId = village?.villageId;
        this.buildingView = {...village!.buildings.find(f => f.name == "Rally-point")!};
        let res = new Map<string, number>();
        for (const [key, value] of Object.entries(this.buildingView!.resourcesToNextLevel)) {
          res.set(key, value);
        }
        this.buildingView!.resourcesToNextLevel = res;

        this.homeLegion = {
          villageId: village!.villageId,
          units: [...village!.homeUnits],
          nation: village!.nation
        };
      });
  }

  getAllCombatGroups(redirected: boolean) {
    this.store.dispatch(fetchCombatGroups());
      if (redirected) {
        this.selectTab(1);
      }
  }
}
