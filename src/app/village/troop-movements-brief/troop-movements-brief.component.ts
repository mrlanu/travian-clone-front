import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {fetchSettlement} from "../store/settlement.actions";
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

  villageId: string | null | undefined;
  movedTroopsList: Map<string, TroopMovementsBrief> | undefined;
  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {
    this.componentSubs.push(this.store.select(settlementSelector)
      .subscribe(v => {
        this.villageId = v?.villageId;
        this.getTroopMovements(v!.villageId)
      }));
  }

  private getTroopMovements(villageId: string) {
    this.villageService.getTroopMovements(villageId).subscribe(res => {
      this.movedTroopsList = res;
    });
  }

  onCountDone() {
    this.store.dispatch(fetchSettlement({id: this.villageId!}));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
