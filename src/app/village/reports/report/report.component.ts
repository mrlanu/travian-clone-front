import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../store/app.reducer";
import {Subscription} from "rxjs";
import {reportSelector, reportsSelector} from "../../store/settlement.selectors";
import {fetchReport} from "../../store/settlement.actions";
import {ActivatedRoute} from "@angular/router";
import {faArrowLeft, faArrowRight, faTrash, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {ReportBrief} from "../reports-list/reports-list.component";


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
  troops: number[];
  dead: null[];
  bounty: Map<string, number>;
  carry: number;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy{
  reportBriefsList: ReportBrief[] = [];
  currentBrief: ReportBrief | undefined;
  report: Report | undefined;
  componentSubs: Subscription[] = [];
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faTrash = faTrash;
  faEnvelope = faEnvelope;
  faStyle = {
    'color': 'white'
  }

  constructor(private store: Store<fromAppStore.AppState>, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const reportId = this.route.snapshot.params['id'];
    this.componentSubs.push(this.store.select(reportsSelector).subscribe(reports => {
      this.reportBriefsList = reports;
    }));
    this.componentSubs.push(this.store.select(reportSelector).subscribe(report => {
      console.log(report);
      this.report = report;
      this.currentBrief = this.reportBriefsList.find(b => b.id === report?.id);
    }));
    this.store.dispatch(fetchReport({reportId}));
  }

  onLeft(){
    let number = 0;
    this.reportBriefsList.find((r, i) => {
      number = i;
      return r.id === this.report?.id});
    if (this.reportBriefsList[number - 1]){
      this.store.dispatch(fetchReport({reportId: this.reportBriefsList[number - 1].id}));
    }
  }

  onRight(){
    let number = 0;
    this.reportBriefsList.find((r, i) => {
      number = i;
      return r.id === this.report?.id});
    if (this.reportBriefsList[number + 1]){
      this.store.dispatch(fetchReport({reportId: this.reportBriefsList[number + 1].id}));
    }
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
