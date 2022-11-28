import {Component, OnDestroy, OnInit} from '@angular/core';
import {VillageView} from "../../../models/village-dto.model";
import {Subscription} from "rxjs";
import {VillageService} from "../../../services/village.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BuildingView} from "../building-details.component";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../store/app.reducer";
import {settlementSelector} from "../../store/settlement.selectors";
import {fetchSettlement} from "../../store/settlement.actions";

@Component({
  selector: 'app-building-details-container',
  templateUrl: './building-details-container.component.html',
  styleUrls: ['./building-details-container.component.css']
})
export class BuildingDetailsContainerComponent implements OnInit, OnDestroy {

  village!: VillageView;
  buildingView!: BuildingView;
  path = '';

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private route: ActivatedRoute,
              private router: Router, private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {
    this.path = this.router.url.split('/')[3];
    this.componentSubs.push(
      this.store.select(settlementSelector).subscribe(
        village => {
          this.village = village!;
          this.buildingView = {...village!.buildings.find(f => {
            return f.position == +this.route.snapshot.params['position'];
          })!};
          let res = new Map<string, number>();
          for(const [key, value] of Object.entries(this.buildingView!.resourcesToNextLevel)){
            res.set(key, value);
          }
          this.buildingView.resourcesToNextLevel = res;
        }));
    this.store.dispatch(fetchSettlement({id: this.route.parent?.snapshot.params['village-id']}));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
