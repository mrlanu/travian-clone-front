import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../store/app.reducer";
import {Subscription} from "rxjs";
import {editedReportsSelector, reportsBriefSelector, reportSelector} from "../store/reports.selectors";
import {countNewReports, deleteReports, fetchReport, openReport} from "../store/reports.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {
  faArrowLeft,
  faArrowRight,
  faBullseye,
  faEnvelope,
  faFileZipper,
  faRepeat,
  faShieldHalved,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import {ReportBrief} from "../reports-list/reports-list.component";
import {skip} from "rxjs/operators";


export interface Report {
  id: string;
  reportOwner: string;
  mission: string;
  from: ReportPlayer;
  to: ReportPlayer;
  dateTime: Date;
  read: boolean;
}

export interface ReportPlayer{
  settlementId: string;
  settlementName: string;
  accountId: string;
  playerName: string;
  nation: string;
  troops: number[];
  dead: null[];
  bounty: Map<string, number>;
  carry: number;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css', '../reports.component.css', '../../../shared/resources.css']
})
export class ReportComponent implements OnInit, OnDestroy{
  reportBriefsList: ReportBrief[] = [];
  currentBrief: ReportBrief | undefined;
  report: Report | undefined;
  bounty = 0;
  componentSubs: Subscription[] = [];
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faTrash = faTrash;
  faEnvelope = faEnvelope;
  faFileZipper = faFileZipper;
  faRepeat = faRepeat;
  faShieldHalved = faShieldHalved;
  faBullseye = faBullseye;
  faStyle = {
    'color': 'white'
  }

  constructor(private store: Store<fromAppStore.AppState>, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const reportId = this.route.snapshot.params['id'];
    this.componentSubs.push(this.store.select(reportsBriefSelector).subscribe(reports => {
      this.reportBriefsList = [...reports];
    }));
    this.componentSubs.push(this.store.select(reportSelector).pipe(skip(1)).subscribe(report => {
      let sum = 0;
      this.report = report;
      report?.from.bounty.forEach(value => sum += value);
      this.bounty = sum;
      this.currentBrief = this.reportBriefsList.find(b => b.id === report?.id);
      if (!report?.read){
        this.store.dispatch(openReport({report: report!}));
      }
    }));
    this.componentSubs.push(this.store.select(editedReportsSelector).pipe(skip(1)).subscribe(() => {
      this.editedReports();
      }
    ));
    this.store.dispatch(fetchReport({reportId}));
  }

  onLeft(){
    this.reportBriefsList.forEach((b, i) => {
      if (b.id === this.report?.id ){
        if (this.reportBriefsList[i - 1]){
          this.store.dispatch(fetchReport({reportId: this.reportBriefsList[i - 1].id}));
        }else {
          this.store.dispatch(fetchReport({reportId: this.reportBriefsList[this.reportBriefsList.length - 1].id}));
        }
      }
    });
  }

  onRight(){
    this.reportBriefsList.forEach((b, i) => {
      if (b.id === this.report?.id){
        if (this.reportBriefsList[i + 1]){
          this.store.dispatch(fetchReport({reportId: this.reportBriefsList[i + 1].id}));
        } else {
          this.store.dispatch(fetchReport({reportId: this.reportBriefsList[0].id}));
        }
      }
    });
  }

  onDelete(){
    this.store.dispatch(deleteReports({reportsId: [this.report!.id]}));
  }

  private editedReports(){
    this.reportBriefsList.forEach((b, i) => {
      if (b.id === this.report?.id){
        this.reportBriefsList.splice(i,1);

        if (this.reportBriefsList.length > 0){
          if (this.reportBriefsList[i + 1]){
            this.store.dispatch(fetchReport({reportId: this.reportBriefsList[i + 1].id}));
          } else {
            this.store.dispatch(fetchReport({reportId: this.reportBriefsList[0].id}));
          }
        }else {
          this.router.navigate(['../'], {relativeTo: this.route});
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
