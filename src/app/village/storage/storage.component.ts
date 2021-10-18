import {Component, OnDestroy, OnInit} from '@angular/core';
import {EResource, VillageView} from "../../models/village-dto.model";
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

        let prodPerHour = new Map<string, number>();
        for(const [key, value] of Object.entries(v.producePerHour)){
          prodPerHour.set(key, value);
        }

        for(const [key, value] of Object.entries(v.storage)){
          switch (key){
            case 'WOOD': {
              this.wood = Math.trunc(value);
              //this.intervalList.push(this.startTimer(key, Math.trunc(3600000 / prodPerHour.get('WOOD')!)));
              this.intervalList.push(this.startTimer(key, 1000));
              break;
            }
            case 'CLAY': {
              this.clay = Math.trunc(value);
              this.intervalList.push(this.startTimer(key, Math.trunc(3600000 / prodPerHour.get('CLAY')!)));
              break;
            }
            case 'IRON': {
              this.iron = Math.trunc(value);
              this.intervalList.push(this.startTimer(key, Math.trunc(3600000 / prodPerHour.get('IRON')!)));
              break;
            }
            case 'CROP': {
              this.crop = Math.trunc(value);
              this.intervalList.push(this.startTimer(key, Math.trunc(3600000 / prodPerHour.get('CROP')!)));
              break;
            }
            default: {
              break;
            }

          }
        }
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
  }

}
