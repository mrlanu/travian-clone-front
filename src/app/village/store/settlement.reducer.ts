import {createReducer, on} from '@ngrx/store';
import * as SettlementActions from './settlement.actions';
import {ShortVillageInfo, VillageView} from "../../models/village-dto.model";
import {Building} from "../all-buildings-list/all-buildings-list.component";
import {CombatUnit} from "../building-details/barracks/combat-unit/combat-unit.component";
import {CombatGroupSendingContract, CombatGroupsMap} from "../building-details/rally-point/rally-point.component";
import {TroopMovementsBrief} from "../troop-movements-brief/troop-movements-brief.component";
import {ReportBrief} from "../reports/reports-list/reports-list.component";
import {Report} from "../reports/report/report.component";

export interface State {
  current: VillageView | undefined;
  allSettlements: ShortVillageInfo[];
  availableBuildings: Building[];
  researchedUnits: CombatUnit[];
  combatGroups: CombatGroupsMap;
  movementsBrief: Map<string, TroopMovementsBrief>;
  sendingContract: CombatGroupSendingContract | null,
  isTroopsSent: boolean,
  reports: ReportBrief[],
  currentReport: Report | undefined,
  editedReports: boolean,
  newReportsCount: number
}

export const initialState: State = {
  current: undefined,
  allSettlements: [],
  availableBuildings: [],
  researchedUnits: [],
  combatGroups: {
    IN: [], OUT: [], AWAY: [], HOME: []
  },
  movementsBrief: new Map(),
  sendingContract: null,
  isTroopsSent: false,
  reports: [],
  currentReport: undefined,
  editedReports: false,
  newReportsCount: 0,
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
  on(SettlementActions.setResearchedUnits, (state, { units }) => (
    { ...state, researchedUnits: units }
  )),
  on(SettlementActions.setCombatGroups, (state, {groups}) => (
    { ...state, combatGroups: groups }
  )),
  on(SettlementActions.setMovementsBrief, (state, {brief}) => (
    { ...state, movementsBrief: brief }
  )),
  on(SettlementActions.setSendingContract, (state, {contract}) => (
    { ...state, sendingContract: contract }
  )),
  on(SettlementActions.troopsSent, (state, {result}) => (
    { ...state, isTroopsSent: result }
  )),
  on(SettlementActions.setReportsBrief, (state, {reports}) => (
    { ...state, reports: reports }
  )),
  on(SettlementActions.setReport, (state, {report}) => (
    { ...state, currentReport: report }
  )),
  on(SettlementActions.editedReports, (state) => (
    { ...state, editedReports: !state.editedReports }
  )),
  on(SettlementActions.addReportsCount, (state, {amount}) => (
    { ...state, current: {...state.current!, newReportsCount: state.current!.newReportsCount + amount} }
  )),
  on(SettlementActions.subtractReportsCount, (state, {amount}) => (
    { ...state, current: {...state.current!, newReportsCount: state.current!.newReportsCount - amount} }
  )),
  on(SettlementActions.clear, () => (
    { ...initialState }
  )),
);
