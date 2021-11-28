import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-troops-detail-item',
  templateUrl: './troops-detail-item.component.html',
  styleUrls: ['./troops-detail-item.component.css']
})
export class TroopsDetailItemComponent implements OnInit {

  @Input() troopsUnit!: Map<string, number> | null;
  imgSrc = "../../../../../assets/img/x.gif";

  constructor() { }

  ngOnInit(): void {
  }

}
