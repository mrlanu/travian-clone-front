import {createReducer, on} from '@ngrx/store';
import * as StatisticsActions from './statistics.actions';
import {StatsInfo} from "../statistics.component";

export interface State {
  current: StatsInfo | undefined;
}

export const initialState: State = {
  current: undefined,
};

export const statisticsReducer = createReducer(
  initialState,
  on(StatisticsActions.setStatistics, (state, { statistics }) => (
    { ...state, current: statistics }
  )),
);
