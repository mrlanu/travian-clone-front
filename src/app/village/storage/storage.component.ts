import {Component, OnDestroy, OnInit} from '@angular/core';
import {VillageView} from "../../models/village-dto.model";
import {VillageService} from "../../services/village.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {settlementSelector} from "../store/settlement.selectors";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit, OnDestroy {

  negativeCrop = false;
  max = 100;

  wood = 0;
  clay = 0;
  iron = 0;
  crop = 0;

  woodProgress = 0;
  clayProgress = 0;
  ironProgress = 0;
  cropProgress = 0;

  warehouseCapacity = 0;
  granaryCapacity = 0;

  componentSubs: Subscription[] = [];
  intervalList: number[] = [];

  constructor(private villageService: VillageService, private store: Store<fromAppStore.AppState>) {}

  ngOnInit(): void {
    this.componentSubs.push(this.store.select(settlementSelector)
      .subscribe(v => {
          this.negativeCrop = v?.producePerHour.get('CROP')! < 0;
          let type: 'success' | 'info' | 'warning' | 'danger';

          this.intervalList.forEach(i => {
            clearInterval(i);
          });
          this.intervalList = [];

          this.wood = Math.trunc(v!.storage[0]!);
          this.woodProgress = Math.floor(v!.storage[0]! * 100 / v!.warehouseCapacity)
          this.intervalList.push(this.startTimer('WOOD', Math.trunc(3600000 / v!.producePerHour.get('WOOD')!)));

          this.clay = Math.trunc(v!.storage[1]!);
          this.clayProgress = Math.floor(v!.storage[1]! * 100 / v!.warehouseCapacity)
          this.intervalList.push(this.startTimer('CLAY', Math.trunc(3600000 / v!.producePerHour.get('CLAY')!)));

          this.iron = Math.trunc(v!.storage[2]!);
          this.ironProgress = Math.floor(v!.storage[2]! * 100 / v!.warehouseCapacity)
          this.intervalList.push(this.startTimer('IRON', Math.trunc(3600000 / v!.producePerHour.get('IRON')!)));

          this.crop = Math.trunc(v!.storage[3]!);
          this.cropProgress = Math.floor(v!.storage[3]! * 100 / v!.granaryCapacity)
          this.intervalList.push(this.startTimer('CROP', Math.trunc(3600000 / v!.producePerHour.get('CROP')!)));

          this.warehouseCapacity = v!.warehouseCapacity;
          this.granaryCapacity = v!.granaryCapacity;

      }));
  }

  startTimer(resource: string, timeout: number): number {
    return setInterval(() => {
      switch (resource) {
        case 'WOOD': {
          this.wood++;
          if (this.wood > this.warehouseCapacity){
            this.wood = this.warehouseCapacity;
          }
          break;
        }
        case 'CLAY': {
          this.clay++;
          if (this.clay > this.warehouseCapacity){
            this.clay = this.warehouseCapacity;
          }
          break;
        }
        case 'IRON': {
          this.iron++;
          if (this.iron > this.warehouseCapacity){
            this.iron = this.warehouseCapacity;
          }
          break;
        }
        case 'CROP': {
          if (timeout <= 0){
            this.crop--;
          }else {
            this.crop++;
          }
          if (this.crop > this.granaryCapacity){
            this.crop = this.granaryCapacity;
          }
          break;
        }
        default: {
          break;
        }
      }
    }, timeout <= 0 ? -timeout : timeout);
  }

  ngOnDestroy() {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
    this.intervalList.forEach(i => {
      clearInterval(i);
    });
  }

}
