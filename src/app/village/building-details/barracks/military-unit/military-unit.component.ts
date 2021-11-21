import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MilitaryUnit} from "../barracks.component";
import {Utils} from "../../../../shared/utils";
import {VillageService} from "../../../../services/village.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-military-unit',
  templateUrl: './military-unit.component.html',
  styleUrls: ['./military-unit.component.css']
})
export class MilitaryUnitComponent implements OnInit {

  @Input() unit: MilitaryUnit | undefined;
  @Input() amount: number | undefined;
  @ViewChild('amountInput') amountInput: ElementRef | undefined;
  constructor(private villageService: VillageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  formatTime(time: number){
    return Utils.formatTime(time);
  }

  orderUnits(amount: string){
    let villageId = this.route.parent?.snapshot.params['village-id'];
    this.amountInput!.nativeElement.value = '';
    this.villageService.orderMilitaryUnits(villageId, 'PHALANX', +amount);
  }

}
