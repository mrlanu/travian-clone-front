import {Component, OnInit, ViewChild} from '@angular/core';
import {VillageView} from "../../../models/village-dto.model";
import {map, take} from "rxjs/operators";
import {VillageService} from "../../../services/village.service";
import {BuildingView} from "../building-details.component";
import {MilitaryUnit} from "./military-unit/military-unit.component";
import {TabsetComponent} from "ngx-bootstrap/tabs";

@Component({
  selector: 'app-rally-point',
  templateUrl: './rally-point.component.html',
  styleUrls: ['./rally-point.component.css']
})
export class RallyPointComponent implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  villageId: string | undefined;
  buildingView!: BuildingView
  militaryUnitList: MilitaryUnit[] = [];

  constructor(private villageService: VillageService) { }

  ngOnInit(): void {
    this.getRallyPointBuildingFromCurrentVillage();
  }

  onSendingSelect(){
    this.getListOfAllMilitaryUnits();
  }

  selectTab(tabId: number) {
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

        this.getListOfAllMilitaryUnits();
      });
  }

  private getListOfAllMilitaryUnits() {
    this.villageService.getAllMilitaryUnits(this.villageId!).subscribe(res => {
      this.militaryUnitList = res.map(mU => new MilitaryUnit(
          mU.id, mU.nation, mU.move, mU.mission, mU.originVillageId, mU.originVillageName, mU.originVillageCoordinates,
          mU.currentLocationVillageId, mU.targetVillageId, mU.targetVillageName, mU.targetPlayerName, mU.targetVillageCoordinates,
          mU.units, mU.arrivalTime ? new Date(mU.arrivalTime) : null, mU.duration, mU.expensesPerHour))
      });
  }
}
