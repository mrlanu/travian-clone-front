import {Component, Input, OnInit} from '@angular/core';
import {Utils} from "../../../../shared/utils";

export class MilitaryUnit {
  constructor(
    public id: string,
    public nation: string,
    public move: boolean,
    public mission: string,
    public originVillageId: string,
    public originVillageName: string,
    public originVillageCoordinates: number[],
    public currentLocationVillageId: string,
    public targetVillageId: string,
    public targetVillageName: string,
    public targetPlayerName: string,
    public targetVillageCoordinates: number[],
    public units: number[],
    public arrivalTime: null | Date,
    public duration: number,
    public expensesPerHour: number
  ) {}
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
