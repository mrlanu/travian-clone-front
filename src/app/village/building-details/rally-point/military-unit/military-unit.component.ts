import {Component, Input, OnInit} from '@angular/core';
import {Utils} from "../../../../shared/utils";

export class MilitaryUnit{
  constructor(
    public id: string, public nation: string, public move: boolean, public state: string, public mission: string, public originVillageId: string,
    public originVillageName: string, public originVillageCoordinates: number[], public targetVillageId: string,
    public targetVillageName: string, public currentLocationVillageId: string, public arrivalTime: Date | null, public duration: number,
    public eatExpenses: number, public units: number[]
  ) {
  }
}

@Component({
  selector: 'app-military-unit',
  templateUrl: './military-unit.component.html',
  styleUrls: ['./military-unit.component.css', '../../../../shared/combat-units.css']
})
export class MilitaryUnitComponent implements OnInit {

  @Input() militaryUnit!: MilitaryUnit;
  imgSrc = "../../../../../assets/img/x.gif";

  constructor() { }

  ngOnInit(): void {

  }

  getDuration(): string{
    return Utils.formatTime(this.militaryUnit.duration);
  }

}
