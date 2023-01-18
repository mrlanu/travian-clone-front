import {Component, Input, OnInit} from '@angular/core';
import {Building} from "../all-buildings-list.component";
import {Utils} from "../../../shared/utils";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../store/app.reducer";
import {buildNewBuilding} from "../../store/settlement.actions";

@Component({
  selector: 'app-building-item',
  templateUrl: './building-item.component.html',
  styleUrls: ['./building-item.component.css']
})
export class BuildingItemComponent implements OnInit {

  @Input() building!: Building;

  constructor(private store: Store<fromAppStore.AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {}

  public formatTime(timeSeconds: number): string {
    return Utils.formatTime(timeSeconds);
  }

  onBuildingSelect(buildingID: string){
    const selectedPosition = this.route.snapshot.params['position'];
    const villageId = this.route.parent!.snapshot.params['village-id'];
    this.store.dispatch(buildNewBuilding({position: selectedPosition, id: buildingID}));
    this.router.navigate(['/villages', villageId, 'buildings']);
  }

}
