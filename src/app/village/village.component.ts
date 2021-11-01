import {Component, OnDestroy, OnInit} from '@angular/core';
import {EUnits, VillageView} from "../models/village-dto.model";
import {Subscription} from "rxjs";
import {VillageService} from "../services/village.service";

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.css']
})
export class VillageComponent implements OnInit, OnDestroy {

  villageId: string = '618016eefac3034ad72ace94';
  isBuildings = false;

  village: VillageView =  {
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

  onBuildingsClick(e: boolean){
    this.isBuildings = e;
  }

  ngOnInit(): void {
    this.componentSubs.push(
      this.villageService.villageChanged.subscribe(
        (village: VillageView) => {
          this.village = village;
          console.log(village);
        }));
    this.villageService.getVillageById(this.villageId);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
