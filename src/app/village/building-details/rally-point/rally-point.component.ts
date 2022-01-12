import {Component, OnInit, ViewChild} from '@angular/core';
import {VillageView} from "../../../models/village-dto.model";
import {take} from "rxjs/operators";
import {VillageService} from "../../../services/village.service";
import {BuildingView} from "../building-details.component";
import {TabsetComponent} from "ngx-bootstrap/tabs";
import {MilitaryUnit} from "./military-unit/military-unit.component";

export class TroopsSendingRequest {
  constructor(public villageId: string, public x: number, public y: number,
              public kind: string, public waves: WaveModels[]) {
  }
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

export class MilitaryUnitContract {
  constructor(
    public id: string,
    public nation: string,
    public move: boolean,
    public mission: string,
    public originVillageId: string,
    public originVillageName: string,
    public originPlayerName: string,
    public originVillageCoordinates: number[],
    public currentLocationVillageId: string,
    public targetVillageId: string,
    public targetVillageName: string,
    public targetPlayerName: string,
    public targetVillageCoordinates: number[],
    public units: number[],
    public arrivalTime: null | Date,
    public duration: number,
    public expensesPerHour: number
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
  buildingView!: BuildingView
  homeLegion: HomeLegion = {
    villageId: '',
    units: [0,0,0,0,0,0,0,0,0,0,0],
    nation: 'GALLS'
  };
  militaryUnitList: any;

  constructor(private villageService: VillageService) { }

  ngOnInit(): void {
    this.getRallyPointBuildingFromCurrentVillage();
  }

  onSendingSelect(){
    this.getListOfAllMilitaryUnits();
  }

  selectTab(tabId: number) {
    this.getListOfAllMilitaryUnits();
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }

  private getRallyPointBuildingFromCurrentVillage() {
    this.villageService.currentVillage.pipe(take(1)).subscribe(
      (village: VillageView | null) => {
        this.villageId = village?.villageId;
        this.buildingView = village!.buildings.find(f => f.name == "Rally-point")!;
        let res = new Map<string, number>();
        for (const [key, value] of Object.entries(this.buildingView!.resourcesToNextLevel)) {
          res.set(key, value);
        }
        this.buildingView!.resourcesToNextLevel = res;

        this.homeLegion = {
          villageId: village!.villageId,
          units: village!.homeUnits,
          nation: village!.nation
        };
        this.getListOfAllMilitaryUnits();
      });
  }

  private getListOfAllMilitaryUnits() {
    this.villageService.getAllMilitaryUnits(this.villageId!).subscribe(res => {
      /*let units = new Map<string, MilitaryUnit[]>();
      units.set('Outgoing armies', res['Outgoing armies']);
      units.set('Incoming armies', res['Incoming armies']);
      units.set('Armies in this village', res['Armies in this village']);
      units.set('Armies in other places', res['Armies in other places']);
      console.log(units);*/
      this.militaryUnitList = res;
      console.log(res);
      /*res.map(

        mU => new MilitaryUnit(
          mU.id, mU.nation, mU.move, mU.state, mU.mission, mU.originVillageId, mU.originVillageName, mU.originVillageCoordinates, mU.targetVillageId,
          mU.targetVillageName, mU.currentLocationVillageId, mU.arrivalTime ? new Date(mU.arrivalTime) : null, mU.duration,
          mU.eatExpenses, mU.units));*/
      });
  }
}
