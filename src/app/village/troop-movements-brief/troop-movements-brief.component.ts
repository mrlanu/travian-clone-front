import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {fetchMovementsBrief, fetchSettlement} from "../store/settlement.actions";
import {movementsBriefSelector} from "../store/settlement.selectors";

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
    this.componentSubs.push(this.store.select(movementsBriefSelector).subscribe(brief => {
        this.movedTroopsList = brief;
    }));
    this.store.dispatch(fetchMovementsBrief());
  }

  onCountDone() {
    this.store.dispatch(fetchSettlement());
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
