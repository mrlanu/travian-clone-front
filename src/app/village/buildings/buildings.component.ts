import {Component, OnDestroy, OnInit} from '@angular/core';
import {VillageView} from "../../models/village-dto.model";
import {VillageService} from "../../services/village.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {BuildingView} from "../building-details/building-details.component";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {settlementSelector} from "../store/settlement.selectors";
import {fetchSettlement} from "../store/settlement.actions";

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit, OnDestroy {

  village!: VillageView;

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private route: ActivatedRoute, private router: Router,
              private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {
    this.componentSubs.push(
      this.store.select(settlementSelector).subscribe(
        village => {
          this.village = village!;
        }));
    this.componentSubs.push(this.route.parent!.params.subscribe((params) => {
      this.store.dispatch(fetchSettlement())
    }));
  }

  onBuildingSelect(building: BuildingView){
    if (building.name === 'empty-spot'){
      this.router.navigate(['/villages', this.village.villageId, 'buildings', building.position, 'new']);
    } else {
      this.router.navigate(['/villages', this.village.villageId, 'buildings', building.position, building.name]);
    }
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
