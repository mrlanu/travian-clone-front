import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Utils} from "../../../../shared/utils";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../../store/app.reducer";
import {settlementSelector} from "../../../store/settlement.selectors";
import {orderCombatUnits} from "../../../store/settlement.actions";

export class CombatUnit {
  constructor(
    public name: string,
    public level: number,
    public attack: number,
    public defInfantry: number,
    public defCavalry : number,
    public speed: number,
    public capacity: number,
    public cost: number[],
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
  currentSettlementId = '';

  constructor(private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {
    this.store.select(settlementSelector).subscribe(village => {
      this.currentSettlementId = village?.villageId!;
      this.calculateMaxUnits(village!.storage);
    });
  }

  formatTime(time: number){
    return Utils.formatTime(time);
  }

  orderUnits(amount: string){
    this.amountInput!.nativeElement.value = '';
    this.store.dispatch(orderCombatUnits({unitType: 'PHALANX', amount: +amount}))
  }

  private calculateMaxUnits(storage: number[]) {
    let result = 1000000;
    storage.forEach((value, i) => {
      let tempResult = Math.trunc(value / this.unit!.cost[i]!);
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
