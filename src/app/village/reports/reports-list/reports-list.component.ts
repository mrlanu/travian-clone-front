import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../store/app.reducer";
import {editedReportsSelector, reportsBriefSelector} from "../../store/settlement.selectors";
import {deleteReports, fetchReportsBrief, readReports, subtractReportsCount} from "../../store/settlement.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {skip} from "rxjs/operators";

export interface ReportBrief {
  id: string;
  read: boolean;
  subject: string;
  received: Date;
}

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit, OnDestroy{
  reportsData: ReportBrief[] = [];
  displayedColumns: string[] = ['select', 'subject', 'received'];
  dataSource = new MatTableDataSource<ReportBrief>([]);
  selection = new SelectionModel<ReportBrief>(true, []);
  componentSubs: Subscription[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private store: Store<fromAppStore.AppState>, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.componentSubs.push(this.store.select(reportsBriefSelector).subscribe(reports => {
      this.dataSource.data = reports;
      this.reportsData = reports;
    }));
    this.componentSubs.push(this.store.select(editedReportsSelector).pipe(skip(1)).subscribe(() => {
        this.reportsEdited();
      }
    ));
    this.store.dispatch(fetchReportsBrief());
  }

  onReportSelect(reportId: string){
    this.router.navigate([reportId], {relativeTo:this.route});
    if (!this.reportsData.find(r => r.id === reportId)!.read){
      this.store.dispatch(subtractReportsCount({amount: 1}));
    }
  }

  onMark(){
    if (this.selection.hasValue()){
      this.store.dispatch(subtractReportsCount({amount: this.selection.selected.filter(r => !r.read).length}));
      this.store.dispatch(readReports({reportsId: this.selection.selected.map(r => r.id)}));
    } else {
      this.store.dispatch(subtractReportsCount({amount: this.reportsData.filter(r => !r.read).length}));
      this.store.dispatch(readReports({reportsId: this.reportsData.map(r => r.id)}));
    }
    this.selection.clear();
  }

  onDelete(){
    if (this.selection.hasValue()){
      this.store.dispatch(subtractReportsCount({
        amount: this.selection.selected.filter(r => !r.read).length}));
      this.store.dispatch(deleteReports({reportsId: this.selection.selected.map(r => r.id)}));
    } else {
      this.store.dispatch(subtractReportsCount({
        amount: this.reportsData.filter(r => !r.read).length}));
      this.store.dispatch(deleteReports({reportsId: this.reportsData.map(r => r.id)}));
    }
    this.selection.clear();
  }

  private reportsEdited(){
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
  checkboxLabel(row?: ReportBrief): string {
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
