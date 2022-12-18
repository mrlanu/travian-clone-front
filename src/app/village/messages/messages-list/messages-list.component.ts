import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../store/app.reducer";
import {ActivatedRoute, Router} from "@angular/router";
import {messagesSelector} from "../store/messages.selectors";
import {MessageBrief} from "../messages.component";
import {fetchMessages} from "../store/messages.actions";

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent {
  messagesData: MessageBrief[] = [];
  displayedColumns: string[] = ['select', 'subject', 'sender', 'received'];
  dataSource = new MatTableDataSource<MessageBrief>([]);
  selection = new SelectionModel<MessageBrief>(true, []);
  componentSubs: Subscription[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private store: Store<fromAppStore.AppState>, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.componentSubs.push(this.store.select(messagesSelector).subscribe(messages => {
      this.dataSource.data = messages;
      this.messagesData = messages;
      console.log('Messages: ', messages);
    }));
    this.store.dispatch(fetchMessages());
  }

  onMessageSelect(messageId: string){
    this.router.navigate([messageId], {relativeTo:this.route});
  }

  onMark(){

  }

  onDelete(){

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
  checkboxLabel(row?: MessageBrief): string {
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
