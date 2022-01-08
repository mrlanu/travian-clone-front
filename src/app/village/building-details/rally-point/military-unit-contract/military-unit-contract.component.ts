import {Component, Input, OnInit} from '@angular/core';
import {Utils} from "../../../../shared/utils";
import {MilitaryUnitContract} from "../rally-point.component";

@Component({
  selector: 'app-military-unit-contract',
  templateUrl: './military-unit-contract.component.html',
  styleUrls: ['./military-unit-contract.component.css', '../../../../shared/combat-units.css']
})
export class MilitaryUnitContractComponent implements OnInit {

  @Input() militaryUnitContract!: MilitaryUnitContract;
  imgSrc = "../../../../../assets/img/x.gif";

  constructor() { }

  ngOnInit(): void {

  }

  getDuration(): string{
    return Utils.formatTime(this.militaryUnitContract.duration);
  }

}
