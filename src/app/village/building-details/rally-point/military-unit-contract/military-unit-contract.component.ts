import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Utils} from "../../../../shared/utils";
import {CombatGroupSendingContract} from "../rally-point.component";

@Component({
  selector: 'app-military-unit-contract',
  templateUrl: './military-unit-contract.component.html',
  styleUrls: ['./military-unit-contract.component.css', '../../../../shared/combat-units.css']
})
export class MilitaryUnitContractComponent implements OnInit, OnDestroy {

  @Input() militaryUnitContract!: CombatGroupSendingContract;
  imgSrc = "../../../../../assets/img/x.gif";
  arrivalTime: Date | null | undefined;
  intervalId: number | undefined;
  arrivalTimeStr = '';

  constructor() { }

  ngOnInit(): void {
    this.arrivalTime = new Date(this.militaryUnitContract.arrivalTime!);
    this.countDateUp();
  }

  countDateUp(){
    this.intervalId = setInterval(()=>{
      this.arrivalTime?.setTime(this.arrivalTime?.getTime() + 1000);
      let hours = this.arrivalTime!.getHours() < 10 ? `0${this.arrivalTime?.getHours()}` : this.arrivalTime?.getHours().toString();
      let mins = this.arrivalTime!.getMinutes() < 10 ? `0${this.arrivalTime?.getMinutes()}` : this.arrivalTime?.getMinutes().toString();
      let secs = this.arrivalTime!.getSeconds() < 10 ? `0${this.arrivalTime?.getSeconds()}` : this.arrivalTime?.getSeconds().toString();
      this.arrivalTimeStr = `${hours}:${mins}:${secs} `;
    },1000);
  }

  getDuration(): string{
    return Utils.formatTime(this.militaryUnitContract.duration);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }



}
