import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {VillageService} from "../../../services/village.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {CombatUnit} from "./military-unit/combat-unit.component";

export class OrderCombatUnit {
  constructor(public unit: string,
              public amount: number,
              public duration: number,
              public eachDuration: number,
              public endOrder: Date) {}
}

@Component({
  selector: 'app-barracks',
  templateUrl: './barracks.component.html',
  styleUrls: ['./barracks.component.css']
})
export class BarracksComponent implements OnInit {

  @Input() military!: Map<string, number>;

  villageId = '';
  militaryUnitsList: CombatUnit[] = [];
  militaryOrders: OrderCombatUnit[] = [];
  componentSubs: Subscription[] = [];
  currentUnitTime = 0;

  @ViewChild('count') count: any;
  constructor(private villageService: VillageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.villageId = this.route.parent?.snapshot.params['village-id'];
    this.villageService.getAllResearchedUnits(this.villageId)
      .subscribe((res) => {
      this.militaryUnitsList = res.map(unit => {
        let cost = new Map<string, number>();
        for(const [key, value] of Object.entries(unit.cost)){
          cost.set(key, value);
        }
        return new CombatUnit(unit.name, unit.level, unit.attack, unit.defInfantry,
          unit.defCavalry, unit.speed, unit.capacity, cost, unit.time, unit.description);
      })
    });
    this.componentSubs.push(this.villageService.villageChanged.subscribe(village => {
      this.villageService.getAllOrdersCombatUnit(this.villageId);
    }));
    this.componentSubs.push(this.villageService.militaryOrdersChanged
      .subscribe(response => {
        this.militaryOrders = response;
        this.currentUnitTime = response.length > 0 ?
          response[0].duration % response[0].eachDuration : 0;
      }));
    this.villageService.getAllOrdersCombatUnit(this.villageId);
  }

  onCountDone(){
    setTimeout(()=>{}, 500);
    this.villageService.getVillageById(this.villageId);
    this.count.reset(this.currentUnitTime);
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
