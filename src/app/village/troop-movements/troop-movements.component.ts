import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {ActivatedRoute} from "@angular/router";
import {VillageView} from "../../models/village-dto.model";

export class TroopMovementsBrief {
  constructor(public count: number, public timeToArrive: number) {}
}

@Component({
  selector: 'app-troop-movements',
  templateUrl: './troop-movements.component.html',
  styleUrls: ['./troop-movements.component.css']
})
export class TroopMovementsComponent implements OnInit, OnDestroy {

  villageId: string | null | undefined;
  movedTroopsList: Map<string, TroopMovementsBrief> | undefined;
  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.componentSubs.push(this.villageService.villageChanged
      .subscribe((v: VillageView) => {
        this.villageId = v.villageId;
        this.getTroopMovements(v.villageId)
      }));
    /*this.route.parent?.params.subscribe(params => {
      console.log("Params - ", params);
      this.villageId = params['village-id'];
      console.log("Id: ", this.villageId);
      this.getTroopMovements();
    });*/
  }

  private getTroopMovements(villageId: string) {
    this.villageService.getTroopMovements(villageId).subscribe(res => {
      this.movedTroopsList = res;
    });
  }

  onCountDone() {
    this.villageService.getVillageById(this.villageId!);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }


}
