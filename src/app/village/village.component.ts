import {Component, OnDestroy, OnInit} from '@angular/core';
import {EUnits, VillageView} from "../models/village-dto.model";
import {Subscription} from "rxjs";
import {VillageService} from "../services/village.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.css']
})
export class VillageComponent implements OnInit, OnDestroy {

  isBuildings = false;

  village: VillageView | undefined;
  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('From village - ', this.route.snapshot.params);
    this.componentSubs.push(
      this.villageService.villageChanged.subscribe(
        (village: VillageView) => {
          this.village = village;
          console.log(village);
        }));
    this.villageService.getVillageById(this.route.snapshot.params['village-id']);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
