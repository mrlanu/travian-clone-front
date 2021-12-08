import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {MilitaryUnit} from "../../military-unit/military-unit.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-confirm-troops-send',
  templateUrl: './confirm-troops-send.component.html',
  styleUrls: ['./confirm-troops-send.component.css']
})
export class ConfirmTroopsSendComponent implements OnInit {
  title?: string;
  closeBtnName?: string;
  militaryUnit?: MilitaryUnit;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
