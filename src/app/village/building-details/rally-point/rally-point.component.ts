import { Component, OnInit } from '@angular/core';
import {EUnits, VillageView} from "../../../models/village-dto.model";
import {take} from "rxjs/operators";
import {VillageService} from "../../../services/village.service";
import {BuildingView} from "../building-details.component";

@Component({
  selector: 'app-rally-point',
  templateUrl: './rally-point.component.html',
  styleUrls: ['./rally-point.component.css']
})
export class RallyPointComponent implements OnInit {

  villageId: string | undefined;
  buildingView!: BuildingView;
  homeLegion!: Map<string, number>;

  constructor(private villageService: VillageService) { }

  ngOnInit(): void {
    this.villageService.currentVillage.pipe(take(1)).subscribe(
      (village: VillageView | null) => {
        this.villageId = village?.villageId;
        this.homeLegion = village!.homeLegion;
        this.buildingView = village!.buildings.find(f => {
          return f.name == "Rally-point";
        })!;
          let res = new Map<string, number>();
          for(const [key, value] of Object.entries(this.buildingView!.resourcesToNextLevel)){
            res.set(key, value);
          }
          this.buildingView!.resourcesToNextLevel = res;
      });
  }

}
