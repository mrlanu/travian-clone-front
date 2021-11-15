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
              public requirements: { name: string, level: number, exist: boolean }[],
              public available: boolean) {}
}

@Component({
  selector: 'app-all-buildings-list',
  templateUrl: './all-buildings-list.component.html',
  styleUrls: ['./all-buildings-list.component.css']
})
export class AllBuildingsListComponent implements OnInit, OnDestroy {

  villageId!: string;
  buildingList: Building[] = [];
  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.villageId = this.route.parent?.snapshot.params['village-id'];
    this.componentSubs.push(
      this.villageService.getListOfAllNewBuildings(this.villageId).subscribe(
        (buildings: Building[]) => {
          this.buildingList = buildings.map(b => {
            let cost = new Map<string, number>();
            for(const [key, value] of Object.entries(b.cost)){
              cost.set(key, value);
            }
            let req = b.requirements.map(r => {
              return {...r};
            });
            return new Building(b.name, b.type, b.description, cost, b.time, req, b.available);
          });
        }));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
