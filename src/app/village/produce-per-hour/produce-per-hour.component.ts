import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {VillageView} from "../../models/village-dto.model";

@Component({
  selector: 'app-produce-per-hour',
  templateUrl: './produce-per-hour.component.html',
  styleUrls: ['./produce-per-hour.component.css']
})
export class ProducePerHourComponent implements OnInit, OnDestroy {

  wood = 0;
  clay = 0;
  iron = 0;
  crop = 0;

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService) { }

  ngOnInit(): void {
    this.componentSubs.push(this.villageService.villageChanged
      .subscribe((v: VillageView) => {
        this.wood = v.producePerHour.get('WOOD')!;
        this.clay = v.producePerHour.get('CLAY')!;
        this.iron = v.producePerHour.get('IRON')!;
        this.crop = v.producePerHour.get('CROP')!;
      }));
  }

  ngOnDestroy() {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
