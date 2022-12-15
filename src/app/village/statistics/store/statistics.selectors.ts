import {createSelector} from "@ngrx/store";
import * as fromStatistics from "./statistics.reducer";
import * as fromApp from "../../../store/app.reducer";

const statistics = (state: fromApp.AppState) => state.statistics;

export const statisticsSelector = createSelector(
  statistics,
  (state: fromStatistics.State) => state.current
);

