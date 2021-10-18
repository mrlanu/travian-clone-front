import {Component, OnDestroy, OnInit} from '@angular/core';
import {VillageView} from "../../models/village-dto.model";
import {VillageService} from "../../services/village.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit, OnDestroy {

  wood = 0;
  clay = 0;
  iron = 0;
  crop = 0;

  warehouseCapacity = 0;
  granaryCapacity = 0;

  componentSubs: Subscription[] = [];
  intervalList: number[] = [];

  constructor(private villageService: VillageService) {}

  ngOnInit(): void {
    this.componentSubs.push(this.villageService.villageChanged
      .subscribe((v: VillageView) => {

        this.intervalList.forEach(i => {
          clearInterval(i);
        });
        this.intervalList = [];

        this.wood = Math.trunc(v.storage.get('WOOD')!);
        this.intervalList.push(this.startTimer('WOOD', Math.trunc(3600000 / v.producePerHour.get('WOOD')!)));

        this.clay = Math.trunc(v.storage.get('CLAY')!);
        this.intervalList.push(this.startTimer('CLAY', Math.trunc(3600000 / v.producePerHour.get('CLAY')!)));

        this.iron = Math.trunc(v.storage.get('IRON')!);
        this.intervalList.push(this.startTimer('IRON', Math.trunc(3600000 / v.producePerHour.get('IRON')!)));

        this.crop = Math.trunc(v.storage.get('CROP')!);
        this.intervalList.push(this.startTimer('CROP', Math.trunc(3600000 / v.producePerHour.get('CROP')!)));

        this.warehouseCapacity = v.warehouseCapacity;
        this.granaryCapacity = v.granaryCapacity;
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
          this.crop++;
          if (this.crop > this.granaryCapacity){
            this.crop = this.granaryCapacity;
          }
          break;
        }
        default: {
          break;
        }
      }
    }, timeout);
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
