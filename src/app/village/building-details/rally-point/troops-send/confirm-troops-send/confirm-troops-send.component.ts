import {Component, OnInit} from '@angular/core';
import {BsModalRef, ModalOptions} from "ngx-bootstrap/modal";
import {MilitaryUnit} from "../../military-unit/military-unit.component";

@Component({
  selector: 'app-confirm-troops-send',
  templateUrl: './confirm-troops-send.component.html',
  styleUrls: ['./confirm-troops-send.component.css']
})
export class ConfirmTroopsSendComponent implements OnInit {

  title?: string;
  closeBtnName?: string;
  militaryUnit?: MilitaryUnit;
  position?: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  confirm(){
    this.bsModalRef.onHide?.emit('confirm');
  }

}
