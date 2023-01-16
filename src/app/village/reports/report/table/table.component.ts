import {Component, Input, OnInit} from '@angular/core';
import {ReportPlayer} from "../report.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css', '../../../../shared/combat-units.css']
})
export class TableComponent implements OnInit{
  @Input() reportPlayer: ReportPlayer | undefined;
  @Input() hidden: boolean = false;
  imgSrc = "../../../../../assets/img/x.gif";

  ngOnInit(): void {

  }
}
