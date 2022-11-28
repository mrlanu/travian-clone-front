import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventView, VillageView} from "../../models/village-dto.model";
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {settlementSelector} from "../store/settlement.selectors";
import {fetchSettlement} from "../store/settlement.actions";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {

  events: EventView[] = [];
  componentSubs: Subscription[] = [];
  faTimes = faTimes;
  village!: VillageView;

  constructor(private villageService: VillageService, private store: Store<fromAppStore.AppState>) { }

  onEventDelete(eventId: string){
    this.villageService.deleteBuildingEvent(this.village.villageId, eventId);
  }

  ngOnInit(): void {
    this.componentSubs.push(this.store.select(settlementSelector)
      .subscribe(v => {
        this.village = v!;
        this.events = v!.eventsList;
      }));
  }

  ngOnDestroy() {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onCountDone() {
    this.store.dispatch(fetchSettlement({id: this.village.villageId}));
  }
}
