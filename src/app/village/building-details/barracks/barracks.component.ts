import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {CombatUnit} from "./combat-unit/combat-unit.component";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../store/app.reducer";
import {researchedUnitsSelector, settlementSelector} from "../../store/settlement.selectors";
import {fetchResearchedUnits, fetchSettlement} from "../../store/settlement.actions";
import {OrderCombatUnit} from "../../../models/village-dto.model";

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
  constructor(private route: ActivatedRoute, private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {
    this.componentSubs.push(this.store.select(researchedUnitsSelector).subscribe(units => {
        this.militaryUnitsList = units;
      })
    );

    this.componentSubs.push(this.store.select(settlementSelector).subscribe(settlement => {
      const orders = settlement!.unitOrders;
      this.militaryOrders = orders;
      this.currentUnitTime = orders.length > 0 ?
        orders[0].duration % orders[0].eachDuration : 0;
    }));
    this.store.dispatch(fetchResearchedUnits());
  }

  onCountDone(){
    setTimeout(()=>{}, 500);
    this.store.dispatch(fetchSettlement());
    this.count.reset(this.currentUnitTime);
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
