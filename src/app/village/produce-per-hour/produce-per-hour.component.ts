import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {VillageView} from "../../models/village-dto.model";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {settlementSelector} from "../store/settlement.selectors";

@Component({
  selector: 'app-produce-per-hour',
  templateUrl: './produce-per-hour.component.html',
  styleUrls: ['./produce-per-hour.component.css']
})
export class ProducePerHourComponent implements OnInit, OnDestroy {

  village: VillageView | undefined;
  wood = 0;
  clay = 0;
  iron = 0;
  crop = 0;

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {
    this.componentSubs.push(this.store.select(settlementSelector)
      .subscribe(v => {
        this.village = v;
        this.assignResources();
      }));
  }

  private assignResources() {
    this.wood = this.village?.producePerHour.get('WOOD')!;
    this.clay = this.village?.producePerHour.get('CLAY')!;
    this.iron = this.village?.producePerHour.get('IRON')!;
    this.crop = this.village?.producePerHour.get('CROP')!;
  }

  ngOnDestroy() {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
