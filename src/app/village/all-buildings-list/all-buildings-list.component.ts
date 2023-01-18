import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {availableBuildingsSelector} from "../store/settlement.selectors";
import {fetchAvailableBuildings} from "../store/settlement.actions";

export class Building {
  constructor(public name: string,
              public buildingID: string,
              public type: string,
              public description: string,
              public cost: number[],
              public time: number,
              public requirements: { name: string, level: number, exist: boolean }[],
              public available: boolean) {}
}

@Component({
  selector: 'app-all-buildings-list',
  templateUrl: './all-buildings-list.component.html',
  styleUrls: ['./all-buildings-list.component.css']
})
export class AllBuildingsListComponent implements OnInit, OnDestroy {

  villageId!: string;
  buildingList: Building[] = [];
  componentSubs: Subscription[] = [];

  constructor(private route: ActivatedRoute, private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {
    this.villageId = this.route.parent?.snapshot.params['village-id'];
    this.componentSubs.push(
      this.store.select(availableBuildingsSelector).subscribe(
        buildings => this.buildingList = buildings
      )
    );
    this.store.dispatch(fetchAvailableBuildings());
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
