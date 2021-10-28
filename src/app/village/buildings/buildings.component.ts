import {Component, OnDestroy, OnInit} from '@angular/core';
import {EUnits, VillageView} from "../../models/village-dto.model";
import {VillageService} from "../../services/village.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit, OnDestroy {

  village: VillageView | undefined =  {
    accountId: "",
    buildings: [],
    culture: 0,
    eventsList: [],
    fields: [],
    homeLegion: new Map<EUnits, number>(),
    name: "",
    population: 0,
    producePerHour: new Map<string, number>(),
    storage: new Map<string, number>(),
    warehouseCapacity: 0,
    granaryCapacity: 0,
    villageId: "",
    villageType: "",
    x: 0,
    y: 0
  };

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService) { }

  ngOnInit(): void {
    this.componentSubs.push(
      this.villageService.villageChanged.subscribe(
        (village: VillageView) => {
          this.village = village;
        }));
    this.village = this.villageService.currentVillage;
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
