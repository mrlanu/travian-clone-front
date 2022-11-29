import {createReducer, on} from '@ngrx/store';
import * as SettlementActions from './settlement.actions';
import {ShortVillageInfo, VillageView} from "../../models/village-dto.model";
import {Building} from "../all-buildings-list/all-buildings-list.component";

export interface State {
  current: VillageView | undefined;
  allSettlements: ShortVillageInfo[];
  availableBuildings: Building[];
}

export const initialState: State = {
  current: undefined,
  allSettlements: [],
  availableBuildings: [],
};

export const settlementReducer = createReducer(
  initialState,
  on(SettlementActions.setSettlement, (state, { settlement }) => (
    { ...state, current: settlement }
  )),
  on(SettlementActions.setSettlementsList, (state, { list }) => (
    { ...state, allSettlements: list }
  )),
  on(SettlementActions.setAvailableBuildings, (state, { buildings }) => (
    { ...state, availableBuildings: buildings }
  )),
);
