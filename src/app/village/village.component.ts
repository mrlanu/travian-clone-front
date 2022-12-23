import {Component, OnDestroy, OnInit} from '@angular/core';
import {VillageView} from "../models/village-dto.model";
import {Subscription} from "rxjs";
import {VillageService} from "../services/village.service";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../store/app.reducer";
import {settlementSelector} from "./store/settlement.selectors";

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.css']
})
export class VillageComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
