import {createReducer, on} from '@ngrx/store';
import * as SettlementActions from './settlement.actions';
import {ShortVillageInfo, VillageView} from "../../models/village-dto.model";
import {Building} from "../all-buildings-list/all-buildings-list.component";
import {CombatUnit} from "../building-details/barracks/combat-unit/combat-unit.component";
import {CombatGroupSendingContract} from "../building-details/rally-point/rally-point.component";

export interface State {
  current: VillageView | undefined;
  availableBuildings: Building[];
  researchedUnits: CombatUnit[];
  sendingContract: CombatGroupSendingContract | null,
  isTroopsSent: boolean,
}

export const initialState: State = {
  current: undefined,
  availableBuildings: [],
  researchedUnits: [],
  sendingContract: null,
  isTroopsSent: false,
};

export const settlementReducer = createReducer(
  initialState,
  on(SettlementActions.setSettlement, (state, { settlement }) => (
    { ...state, current: settlement }
  )),
  on(SettlementActions.setAvailableBuildings, (state, { buildings }) => (
    { ...state, availableBuildings: buildings }
  )),
  on(SettlementActions.setResearchedUnits, (state, { units }) => (
    { ...state, researchedUnits: units }
  )),
  on(SettlementActions.setSendingContract, (state, {contract}) => (
    { ...state, sendingContract: contract }
  )),
  on(SettlementActions.troopsSent, (state, {result}) => (
    { ...state, isTroopsSent: result }
  )),
  on(SettlementActions.nameUpdated, (state, {settlement}) => (
    { ...state, current: settlement }
  )),
  on(SettlementActions.clear, () => (
    { ...initialState }
  )),
);

export interface StateAllSettlements{
  allSettlements: ShortVillageInfo[];
}

export const initialStateAllSettlements: StateAllSettlements = {
  allSettlements: [],
}

export const settlementsListReducer = createReducer(
  initialStateAllSettlements,
  on(SettlementActions.setSettlementsList, (state, { list }) => (
    { ...state, allSettlements: list }
  )),
);
