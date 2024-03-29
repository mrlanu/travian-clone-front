import {Component, OnInit, ViewChild} from '@angular/core';
import {VillageView} from "../../../models/village-dto.model";
import {take} from "rxjs/operators";
import {VillageService} from "../../../services/village.service";
import {BuildingView} from "../building-details.component";
import {TabsetComponent} from "ngx-bootstrap/tabs";
import {ActivatedRoute} from "@angular/router";

export class CombatGroupSendingRequest {
  constructor(public villageId: string, public x: number, public y: number,
              public mission: string, public waves: WaveModels[]) {
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

export class CombatGroupSendingContract {
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

  constructor(private villageService: VillageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("Rally point init");
    this.getRallyPointBuildingFromCurrentVillage();
    setTimeout(()=>{this.selectTab(this.route.snapshot.queryParams.tab)}, 100);
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
    this.villageService.getVillageById(this.villageId!);
    this.getAllCombatGroups(false);
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
        //this.getAllCombatGroups(false);
      });
  }

  getAllCombatGroups(redirected: boolean) {
    this.villageService.getAllCombatGroups(this.villageId!).subscribe(res => {
      this.militaryUnitList = res;
      console.log("Get List of military units: ", res);
      if (redirected){
        this.selectTab(1);
      }
    });
  }
}
