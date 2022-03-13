import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {ActivatedRoute} from "@angular/router";

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

  constructor(private villageService: VillageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      console.log("Params - ", params);
      this.villageId = params['village-id'];
      console.log("Id: ", this.villageId);
      this.getTroopMovements();
    });
  }

  private getTroopMovements() {
    this.villageService.getTroopMovements(this.villageId!).subscribe(res => {
      this.movedTroopsList = res;
      console.log(res);
    });
  }

  onCountDone() {
    this.villageService.getVillageById(this.villageId!);
    this.getTroopMovements();
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }


}
