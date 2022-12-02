import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Utils} from "../../../../shared/utils";
import {VillageService} from "../../../../services/village.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../../store/app.reducer";
import {settlementSelector} from "../../../store/settlement.selectors";

export class CombatGroup {
  constructor(
    public id: string, public nation: string, public move: boolean, public state: string, public mission: string,
    public from: VillageBrief, public to: VillageBrief, public currentLocationVillageId: string, public executionTime: Date | null, public duration: number,
    public eatExpenses: number, public units: number[], public plunder: any
  ) {
  }
}

export class VillageBrief{
  constructor(public villageId: string, public villageName: string,
              public playerName: string, public coordinates: number[]) {
  }
}

@Component({
  selector: 'app-combat-group',
  templateUrl: './combat-group.component.html',
  styleUrls: ['./combat-group.component.css', '../../../../shared/combat-units.css', '../../../../shared/resources.css']
})
export class CombatGroupComponent implements OnInit {

  @Input() militaryUnit!: CombatGroup;
  @Output() countDownDone = new EventEmitter<any>();
  imgSrc = "../../../../../assets/img/x.gif";
  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {
    this.componentSubs.push(this.store.select(settlementSelector)
      .subscribe(v => {
      }));
  }

  ngOnDestroy() {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onCountDone() {
    /*let villageId = this.route.parent!.snapshot.params['village-id'];
    this.villageService.getVillageById(villageId);*/
    this.countDownDone.emit();
  }

  getDuration(): string{
    return Utils.formatTime(this.militaryUnit.duration);
  }

}
