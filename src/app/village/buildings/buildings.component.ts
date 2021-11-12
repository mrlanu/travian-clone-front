import {Component, OnDestroy, OnInit} from '@angular/core';
import {EUnits, VillageView} from "../../models/village-dto.model";
import {VillageService} from "../../services/village.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {BuildingView} from "../building-details/building-details.component";

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit, OnDestroy {

  village!: VillageView;

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.componentSubs.push(
      this.villageService.villageChanged.subscribe(
        (village: VillageView) => {
          this.village = village;
        }));
    this.componentSubs.push(this.route.parent!.params.subscribe((params) => {
      this.villageService.getVillageById(params['village-id']);
    }));
  }

  onBuildingSelect(building: BuildingView){
    if (building.name === 'empty-spot'){
      this.router.navigate(['/villages', this.village.villageId, 'fields']);
    } else {
      this.router.navigate(['/villages', this.village.villageId, 'buildings', building.position]);
    }
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
