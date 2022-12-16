import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {Subscription} from "rxjs";

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
  itemsPerPage: number;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, OnDestroy{

  statsInfo: StatsInfo | undefined;
  componentSubs: Subscription[] = [];

  constructor(private store: Store<fromAppStore.AppState>) {
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
