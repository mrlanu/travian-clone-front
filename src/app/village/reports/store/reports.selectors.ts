import {createSelector} from "@ngrx/store";
import * as fromReports from "./reports.reducer";
import * as fromApp from "../../../store/app.reducer";

const reports = (state: fromApp.AppState) => state.reports;

export const reportsBriefSelector = createSelector(
  reports,
  (state: fromReports.State) => state.reportBriefs
);

export const reportSelector = createSelector(
  reports,
  (state: fromReports.State) => {
    if (state.currentReport){
      let bounty = new Map<string, number>();
      for(const [key, value] of Object.entries(state.currentReport.from.bounty)){
        bounty.set(key, value);
      }
      return {
        ...state.currentReport, from: {...state.currentReport['from'], bounty: bounty}
      }
    }else {
      return undefined;
    }
  }
);

export const editedReportsSelector = createSelector(
  reports,
  (state: fromReports.State) => state.editedReports
);

export const amountNewReportsSelector = createSelector(
  reports,
  (state: fromReports.State) => state.newReportsAmount
);


