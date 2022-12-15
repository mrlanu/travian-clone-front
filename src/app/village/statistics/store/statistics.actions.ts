import {createAction, props} from "@ngrx/store";
import {StatsInfo} from "../statistics.component";

export const fetchStatistics = createAction(
  '[Statistics] Fetch statistics');

export const setStatistics = createAction(
  '[Statistics] Set statistics', props<{statistics: StatsInfo}>());

export const errorStatistics = createAction('[Statistics] Error', props<{ error: string }>());
