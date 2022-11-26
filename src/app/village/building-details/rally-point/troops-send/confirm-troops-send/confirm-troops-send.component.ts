import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {CombatGroupSendingContract} from "../../rally-point.component";

@Component({
  selector: 'app-confirm-troops-send',
  templateUrl: './confirm-troops-send.component.html',
  styleUrls: ['./confirm-troops-send.component.css']
})
export class ConfirmTroopsSendComponent implements OnInit {

  title?: string;
  closeBtnName?: string;
  militaryUnitContract?: CombatGroupSendingContract;
  position?: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  confirm(){
    this.bsModalRef.onHide?.emit('confirm');
  }

  cancel(){
    this.bsModalRef.onHide?.emit('cancel');
  }

}
