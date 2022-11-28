import {createReducer, on} from '@ngrx/store';
import * as SettlementActions from './settlement.actions';
import {ShortVillageInfo, VillageView} from "../../models/village-dto.model";

export interface State {
  current: VillageView | undefined;
  allSettlements: ShortVillageInfo[];
}

export const initialState: State = {
  current: undefined,
  allSettlements: []
};

export const settlementReducer = createReducer(
  initialState,
  on(SettlementActions.setSettlement, (state, { settlement }) => (
    { ...state, current: settlement }
  )),
  on(SettlementActions.setSettlementsList, (state, { list }) => (
    { ...state, allSettlements: list }
  )),
);
