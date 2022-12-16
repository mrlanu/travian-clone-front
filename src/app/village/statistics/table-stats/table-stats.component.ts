import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {StatsInfo} from "../statistics.component";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../store/app.reducer";
import {Subscription} from "rxjs";
import {statisticsSelector} from "../store/statistics.selectors";
import {skip} from "rxjs/operators";
import {fetchStatistics} from "../store/statistics.actions";

@Component({
  selector: 'app-table-stats',
  templateUrl: './table-stats.component.html',
  styleUrls: ['./table-stats.component.css']
})
export class TableStatsComponent implements OnInit, OnDestroy{

  @Input() headers: string[] = [];
  statsInfo: StatsInfo | undefined;
  componentSubs: Subscription[] = [];

  constructor(private store: Store<fromAppStore.AppState>) {
  }

  ngOnInit(): void {
    this.componentSubs.push(this.store.select(statisticsSelector).pipe(skip(1)).subscribe(statsInfo => {
      this.statsInfo = statsInfo!;
    }));
    this.store.dispatch(fetchStatistics({needStatisticsId: true, page: null}));
  }

  getPage(event: number){
    this.store.dispatch(fetchStatistics({needStatisticsId: false, page: event}));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
