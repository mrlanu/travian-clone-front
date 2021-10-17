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

  storage = new Map<string, number>(
    [
      ["WOOD", 0], ["CLAY", 0], ["IRON", 0], ["CROP", 0]
    ]
  );
  warehouseCapacity: number = 0;
  granaryCapacity: number = 0;

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService) {}

  ngOnInit(): void {
    this.componentSubs.push(this.villageService.villageChanged
      .subscribe((v: VillageView) => {
        for(const [key, value] of Object.entries(v.storage)){
          this.storage.set(key, Math.round(value));
        }
        this.warehouseCapacity = v.warehouseCapacity;
        this.granaryCapacity = v.granaryCapacity;
    }));
  }

  ngOnDestroy() {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
