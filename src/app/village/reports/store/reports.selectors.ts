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
      return {
        ...state.currentReport
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


