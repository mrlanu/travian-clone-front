import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {VillageView} from "../../models/village-dto.model";
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromAppStore from '../../store/app.reducer'
import {settlementSelector} from "../store/settlement.selectors";


@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit, OnDestroy {

  village!: VillageView;
  faHome = faHome;

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private route: ActivatedRoute, private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {
    this.componentSubs.push(
      this.store.select(settlementSelector).subscribe(
        village => {
          this.village = village!;
        })
    );
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
