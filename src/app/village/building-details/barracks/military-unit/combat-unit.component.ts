import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Utils} from "../../../../shared/utils";
import {VillageService} from "../../../../services/village.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

export class CombatUnit {
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

@Component({
  selector: 'app-combat-unit',
  templateUrl: './combat-unit.component.html',
  styleUrls: ['./combat-unit.component.css']
})
export class CombatUnitComponent implements OnInit, OnDestroy {

  @Input() unit: CombatUnit | undefined;
  @Input() amount: number | undefined;
  @ViewChild('amountInput') amountInput: ElementRef | undefined;
  maxUnits = '0';
  enteredValue = '';
  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.villageService.currentVillage.subscribe(village => {
      this.calculateMaxUnits(village!.storage);
    });
  }

  formatTime(time: number){
    return Utils.formatTime(time);
  }

  orderUnits(amount: string){
    let villageId = this.route.parent?.snapshot.params['village-id'];
    this.amountInput!.nativeElement.value = '';
    this.villageService.orderCombatUnits(villageId, 'PHALANX', +amount);
  }

  private calculateMaxUnits(storage: Map<string, number>) {
    let result = 1000000;
    storage.forEach((value, key) => {
      let tempResult = Math.trunc(value / this.unit!.cost.get(key)!);
      if (tempResult < result){
        result = tempResult;
      }
    });
    this.maxUnits = result.toString();
  }

  onInput(event: any){
    this.enteredValue = event.target.value;
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
