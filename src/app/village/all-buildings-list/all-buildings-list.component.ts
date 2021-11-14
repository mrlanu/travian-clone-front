import {Component, OnDestroy, OnInit} from '@angular/core';
import {VillageView} from "../../models/village-dto.model";
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {ActivatedRoute, Router} from "@angular/router";

export class Building {
  constructor(public name: string,
              public type: string,
              public description: string,
              public cost: Map<string, number>,
              public time: number,
              public requirements: string[],
              public isAvailable: boolean) {}
}

@Component({
  selector: 'app-all-buildings-list',
  templateUrl: './all-buildings-list.component.html',
  styleUrls: ['./all-buildings-list.component.css']
})
export class AllBuildingsListComponent implements OnInit, OnDestroy {

  village!: VillageView;
  buildingList: Building[] = [];
  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeDummyData();
    this.componentSubs.push(
      this.villageService.villageChanged.subscribe(
        (village: VillageView) => {
          this.village = village;
        }));
    this.villageService.getVillageById(this.route.parent?.snapshot.params['village-id']);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private initializeDummyData(): void {
    this.buildingList.push(
      new Building('Barrack', 'army',
        'This building is for producing some kind of troops',
        new Map<string, number>([['WOOD', 60], ['CROP', 90], ['CLAY', 100], ['IRON', 90]]), 3600, ['Main building', 'Warehouse', 'Barrack'], true),
      new Building('Granary', 'army',
        'This building is for storing the crop',
        new Map<string, number>([['WOOD', 60], ['CROP', 90], ['CLAY', 100], ['IRON', 90]]), 3600, ['Some building'], false));
  }

}
