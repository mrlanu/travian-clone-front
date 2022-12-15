import {Component, Input} from '@angular/core';
import {Statistics} from "../statistics.component";

@Component({
  selector: 'app-table-stats',
  templateUrl: './table-stats.component.html',
  styleUrls: ['./table-stats.component.css']
})
export class TableStatsComponent {

  @Input() tableData!: {
    headers: string[],
    data: Statistics[]
  };
}
