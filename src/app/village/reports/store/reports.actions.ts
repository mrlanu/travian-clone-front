import {createAction, props} from "@ngrx/store";
import {Report} from "../report/report.component";

export const fetchReportsBrief = createAction(
  '[Reports] Fetch reports brief');

export const setReportsBrief = createAction(
  '[Reports] Set reports brief', props<{ reports: any; }>());

export const fetchReport = createAction(
  '[Reports] Fetch report', props<{reportId: string}>());

export const setReport = createAction(
  '[Reports] Set report', props<{report: Report}>());

export const openReport = createAction(
  '[Reports] Open report', props<{report: Report}>());

export const readReports = createAction(
  '[Reports] Read reports', props<{reportsId: string[]}>());

export const deleteReports = createAction(
  '[Reports] Delete reports', props<{reportsId: string[]}>());

export const editedReports = createAction(
  '[Reports] Reports have been edited');

/*export const addReportsCount = createAction(
  '[Reports] Add reports count', props<{amount: number}>());
*/
export const subtractReportsCount = createAction(
  '[Reports] Subtract reports count', props<{amount: number}>())

export const countNewReports = createAction(
  '[Reports] Count new reports');

export const setReportsAmount = createAction(
  '[Reports] Set reports amount', props<{amount: number;}>());

export const errorReports = createAction('[Reports] Error', props<{ error: string }>());
