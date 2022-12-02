import * as fromAuth from '../auth/store/auth.reducer';
import * as fromSettlement from '../village/store/settlement.reducer'
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  auth: fromAuth.State;
  settlement: fromSettlement.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  settlement: fromSettlement.settlementReducer
};
