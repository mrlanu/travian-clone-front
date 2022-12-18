import * as fromAuth from '../auth/store/auth.reducer';
import * as fromSettlement from '../village/store/settlement.reducer'
import * as fromStatistics from '../village/statistics/store/statistics.reducer'
import * as fromMessages from '../village/messages/store/messages.reducer'
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  auth: fromAuth.State;
  settlement: fromSettlement.State;
  statistics: fromStatistics.State;
  messages: fromMessages.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  settlement: fromSettlement.settlementReducer,
  statistics: fromStatistics.statisticsReducer,
  messages: fromMessages.messagesReducer,
};
