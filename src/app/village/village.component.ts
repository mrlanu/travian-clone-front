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

  village: VillageView | undefined;
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
    this.villageService.getVillageById();
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
