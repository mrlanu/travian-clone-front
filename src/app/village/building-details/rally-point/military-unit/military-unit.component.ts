import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Utils} from "../../../../shared/utils";
import {VillageView} from "../../../../models/village-dto.model";
import {VillageService} from "../../../../services/village.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

export class MilitaryUnit{
  constructor(
    public id: string, public nation: string, public move: boolean, public state: string, public mission: string,
    public origin: VillageBrief, public target: VillageBrief, public currentLocationVillageId: string, public executionTime: Date | null, public duration: number,
    public eatExpenses: number, public units: number[]
  ) {
  }
}

export class VillageBrief{
  constructor(public villageId: string, public villageName: string,
              public playerName: string, public coordinates: number[]) {
  }
}

@Component({
  selector: 'app-military-unit',
  templateUrl: './military-unit.component.html',
  styleUrls: ['./military-unit.component.css', '../../../../shared/combat-units.css']
})
export class MilitaryUnitComponent implements OnInit {

  @Input() militaryUnit!: MilitaryUnit;
  @Output() countDownDone = new EventEmitter<any>();
  imgSrc = "../../../../../assets/img/x.gif";
  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.componentSubs.push(this.villageService.villageChanged
      .subscribe((v: VillageView) => {
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
