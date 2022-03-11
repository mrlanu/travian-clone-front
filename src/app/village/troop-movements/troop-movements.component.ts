import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {VillageView} from "../../models/village-dto.model";
import {map, take} from "rxjs/operators";

export class TroopMovementsResponse {
  constructor(public count: number, public mission: string, public timeToArrive: number) {}
}

@Component({
  selector: 'app-troop-movements',
  templateUrl: './troop-movements.component.html',
  styleUrls: ['./troop-movements.component.css']
})
export class TroopMovementsComponent implements OnInit, OnDestroy {

  villageId: string | null | undefined;
  movedTroopsList: TroopMovementsResponse[] = [];
  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService) { }

  ngOnInit(): void {
    this.villageService.currentVillage.pipe(take(1)).subscribe(
      (village: VillageView | null) => {
        this.villageId = village?.villageId;
        this.getTroopMovements();
      });
  }

  private getTroopMovements() {
    this.villageService.getTroopMovements(this.villageId!).subscribe(res => {
      this.movedTroopsList = res;
      console.log(res);
    });
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }


}
