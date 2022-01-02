import {Component, OnDestroy, OnInit} from '@angular/core';
import {VillageView} from "../../models/village-dto.model";
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";

@Component({
  selector: 'app-home-army',
  templateUrl: './home-army.component.html',
  styleUrls: ['./home-army.component.css']
})
export class HomeArmyComponent implements OnInit, OnDestroy {

  homeArmy: Map<string, number> | undefined;
  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService) { }

  ngOnInit(): void {
    this.componentSubs.push(this.villageService.villageChanged
      .subscribe((v: VillageView) => {
        this.homeArmy = v.homeLegion;
      }));
  }

  ngOnDestroy() {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }


}
