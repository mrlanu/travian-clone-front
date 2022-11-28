import {createReducer, on} from '@ngrx/store';
import * as SettlementActions from './settlement.actions';
import {VillageView} from "../../models/village-dto.model";

export interface State {
  settlement: VillageView | undefined;
}

export const initialState: State = {
  settlement: undefined
};

export const settlementReducer = createReducer(
  initialState,
  on(SettlementActions.setSettlement, (state, { settlement }) => (
    { ...state, settlement }
  )),
);
