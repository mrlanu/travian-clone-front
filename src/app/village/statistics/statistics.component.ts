import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {Subscription} from "rxjs";
import {statisticsSelector} from "./store/statistics.selectors";
import {fetchStatistics} from "./store/statistics.actions";
import {skip} from "rxjs/operators";

export interface Statistics{
    index: number;
    id: string;
    playerName: string;
    playerId: string;
    population: number;
    villagesCount: number;
    allianceName: string;
    attackPoints: number;
    defensePoints: number
}

export interface StatsInfo {
  currentPage: number;
  statistics: Statistics[];
  totalItems: number;
  totalPages: number;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, OnDestroy{

  statistics: Statistics[] = [];
  componentSubs: Subscription[] = [];

  constructor(private store: Store<fromAppStore.AppState>) {
  }

  ngOnInit(): void {
    this.componentSubs.push(this.store.select(statisticsSelector).pipe(skip(1)).subscribe(statsInfo => {
      console.log('Statistics: ', statsInfo);
      this.statistics = statsInfo!.statistics;
    }));
    this.store.dispatch(fetchStatistics());
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
