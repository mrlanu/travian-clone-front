import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {reportsBriefSelector} from "../store/settlement.selectors";
import {fetchReportsBrief} from "../store/settlement.actions";
import {Subscription} from "rxjs";

export interface Report {
  id: string;
  read: boolean;
  subject: string;
  received: Date;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnDestroy{
  reportsData: Report[] = [];
  displayedColumns: string[] = ['select', 'subject', 'received'];
  dataSource = new MatTableDataSource<Report>(this.reportsData);
  selection = new SelectionModel<Report>(true, []);
  componentSubs: Subscription[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private store: Store<fromAppStore.AppState>) {
  }

  ngOnInit(): void {
    this.componentSubs.push(this.store.select(reportsBriefSelector).subscribe(reports => {
      console.log('Reports: ', reports);
      this.dataSource.data = reports;
    }));
    this.store.dispatch(fetchReportsBrief());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Report): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.subject + 1}`;
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }
}
