import {Component, OnInit} from '@angular/core';
import {VillageService} from "../../../services/village.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

export class MilitaryUnit{
  constructor(
    public name: string,
    public level: number,
    public attack: number,
    public defInfantry: number,
    public defCavalry : number,
    public speed: number,
    public capacity: number,
    public cost: Map<string, number>,
    public time: number,
    public description: string) {}
}

export class MilitaryOrder{
  constructor(public unit: string,
              public amount: number,
              public duration: string,
              public endOrder: Date) {}
}

@Component({
  selector: 'app-barracks',
  templateUrl: './barracks.component.html',
  styleUrls: ['./barracks.component.css']
})
export class BarracksComponent implements OnInit {

  militaryUnitsList: MilitaryUnit[] = [];
  militaryOrders: MilitaryOrder[] = [];
  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let villageId = this.route.parent?.snapshot.params['village-id'];
    this.villageService.getAllResearchedUnits(villageId)
      .subscribe((res) => {
      this.militaryUnitsList = res.map(unit => {
        let cost = new Map<string, number>();
        for(const [key, value] of Object.entries(unit.cost)){
          cost.set(key, value);
        }
        return new MilitaryUnit(unit.name, unit.level, unit.attack, unit.defInfantry,
          unit.defCavalry, unit.speed, unit.capacity, cost, unit.time, unit.description);
      })
    });
    this.componentSubs.push(this.villageService.militaryOrdersChanged
      .subscribe(response => {
        this.militaryOrders = response;
        console.log('Orders - ', response);
      }));
    this.villageService.getAllMilitaryOrders(villageId);
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
