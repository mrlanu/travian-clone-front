import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {fetchMovementsBrief, fetchSettlement} from "../store/settlement.actions";
import {settlementSelector} from "../store/settlement.selectors";

export class TroopMovementsBrief {
  constructor(public count: number, public timeToArrive: number) {}
}

@Component({
  selector: 'app-troop-movements-brief',
  templateUrl: './troop-movements-brief.component.html',
  styleUrls: ['./troop-movements-brief.component.css']
})
export class TroopMovementsBriefComponent implements OnInit, OnDestroy {

  movedTroopsList: Map<string, TroopMovementsBrief> | undefined;
  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {
    this.componentSubs.push(this.store.select(settlementSelector).subscribe(settlement => {
        this.movedTroopsList = settlement?.movements;
    }));
  }

  onCountDone() {
    this.store.dispatch(fetchSettlement());
    setTimeout(()=>{
      this.store.dispatch(fetchMovementsBrief())}, 300);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
