import {Component, OnInit} from '@angular/core';
import {VillageView} from "../../../models/village-dto.model";
import {take} from "rxjs/operators";
import {VillageService} from "../../../services/village.service";
import {BuildingView} from "../building-details.component";
import {MilitaryUnit} from "./troops-detail-item/military-unit.component";

@Component({
  selector: 'app-rally-point',
  templateUrl: './rally-point.component.html',
  styleUrls: ['./rally-point.component.css']
})
export class RallyPointComponent implements OnInit {

  villageId: string | undefined;
  buildingView!: BuildingView
  militaryUnitList: MilitaryUnit[] = [];

  constructor(private villageService: VillageService) { }

  ngOnInit(): void {
    this.getRallyPointBuildingFromCurrentVillage();
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
      this.militaryUnitList = res.map(mUnit => {
        console.log(mUnit);
        let units = new Map<string, number>();
        for (const [key, value] of Object.entries(mUnit.units)) {
          units.set(key, value);
        }
        return new MilitaryUnit(mUnit.id, mUnit.nation, mUnit.dynamic, mUnit.originVillageId, mUnit.originVillageName,
          mUnit.currentLocationVillageId, units, mUnit.arrivalTime? new Date(mUnit.arrivalTime!) : null, mUnit.expensesPerHour);
      });
      console.log("Military units ", this.militaryUnitList);
    });
  }
}
