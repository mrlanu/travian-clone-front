import {Component, OnInit} from '@angular/core';
import {TileDetail} from "../map.component";
import {BsModalRef} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tile-detail',
  templateUrl: './tile-detail.component.html',
  styleUrls: ['./tile-detail.component.css']
})
export class TileDetailComponent implements OnInit {

  villageId?: string;
  title?: string;
  closeBtnName?: string;
  tileDetail?: TileDetail;
  position?: string;

  constructor(public bsModalRef: BsModalRef, private router: Router) { }

  ngOnInit(): void {
  }

  cancel(){

  }

  onSendTroops(){
    this.router.navigate(['/villages', this.villageId, 'buildings', '31', 'Rally-point'],
      {queryParams: {targetSettlementId: this.tileDetail?.id, x: this.tileDetail?.x, y: this.tileDetail?.y, tab: 2}});
    this.bsModalRef.hide();
  }

}
