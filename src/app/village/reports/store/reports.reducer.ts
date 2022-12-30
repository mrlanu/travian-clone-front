import {createReducer, on} from '@ngrx/store';
import * as ReportsActions from './reports.actions';
import {ReportBrief} from "../reports-list/reports-list.component";
import {Report} from "../report/report.component";
import * as MessagesActions from "../../messages/store/messages.actions";

export interface State {
  reportBriefs: ReportBrief[],
  currentReport: Report | undefined,
  editedReports: boolean,
  newReportsAmount: number
}

export const initialState: State = {
  reportBriefs: [],
  currentReport: undefined,
  editedReports: false,
  newReportsAmount: 0,

};

export const reportsReducer = createReducer(
  initialState,
  on(ReportsActions.setReportsBrief, (state, {reports}) => (
    { ...state, reportBriefs: reports }
  )),
  on(ReportsActions.setReport, (state, {report}) => (
    { ...state, currentReport: report }
  )),
  on(ReportsActions.editedReports, (state) => (
    { ...state, editedReports: !state.editedReports }
  )),
  on(ReportsActions.setReportsAmount, (state, { amount }) => (
    { ...state, newReportsAmount: amount }
  )),
  on(ReportsActions.subtractReportsCount, (state, {amount}) => (
    { ...state, newReportsAmount: state.newReportsAmount - amount }
  )),
  on(ReportsActions.checkReportAsReadLocally, state => (
    { ...state, currentReport: {...state.currentReport!, read: true} }
  )),
  /*
  on(ReportsActions.addReportsCount, (state, {amount}) => (
    { ...state, newReportsAmount: state.newReportsAmount + amount }
  )),*/
);
