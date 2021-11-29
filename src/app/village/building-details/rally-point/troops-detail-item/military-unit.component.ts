import {Component, Input, OnInit} from '@angular/core';

export class MilitaryUnit {
  constructor(
    public id: string,
    public nation: string,
    public dynamic: boolean,
    public originVillageId: string,
    public originVillageName: string,
    public originVillageCoordinates: number[],
    public currentLocationVillageId: string,
    public units: number[],
    public arrivalTime: null | Date,
    public expensesPerHour: number
  ) {
  }
}

@Component({
  selector: 'app-military-unit',
  templateUrl: './military-unit.component.html',
  styleUrls: ['./military-unit.component.css']
})
export class MilitaryUnitComponent implements OnInit {

  @Input() militaryUnit!: MilitaryUnit;
  imgSrc = "../../../../../assets/img/x.gif";

  constructor() { }

  ngOnInit(): void {
  }

}
