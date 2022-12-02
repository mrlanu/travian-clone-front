import { createAction, props } from '@ngrx/store';
import {ShortVillageInfo, VillageView} from "../../models/village-dto.model";
import {Building} from "../all-buildings-list/all-buildings-list.component";
import {CombatUnit} from "../building-details/barracks/combat-unit/combat-unit.component";
import {
  CombatGroupSendingContract,
  CombatGroupSendingRequest,
  CombatGroupsMap
} from "../building-details/rally-point/rally-point.component";
import {TroopMovementsBrief} from "../troop-movements-brief/troop-movements-brief.component";

export const clear = createAction(
  '[Game] Clear');

export const setSettlement = createAction(
  '[Settlement] Set', props<{ settlement: VillageView }>());

export const fetchSettlementFirstTime = createAction(
  '[Settlement] Fetch first time', props<{ id: string; }>());

export const fetchSettlement = createAction(
  '[Settlement] Fetch');

export const fetchSettlementsList = createAction(
  '[Settlement] Fetch List', props<{ userId: string; }>());

export const setSettlementsList = createAction(
  '[Settlement] Set settlements list', props<{ list: ShortVillageInfo[] }>());

export const buildNewBuilding = createAction(
  '[Settlement] New building', props<{ position: number; kind: string }>());

export const upgradeBuilding = createAction(
  '[Settlement] Upgrade building', props<{ position: number }>());

export const deleteBuildEvent = createAction(
  '[Settlement] Delete build event', props<{ eventId: string }>());

export const updateName = createAction(
  '[Settlement] Update name', props<{ newName: string}>());

export const fetchAvailableBuildings = createAction(
  '[Settlement] Fetch available buildings');

export const setAvailableBuildings = createAction(
  '[Settlement] Set available buildings', props<{ buildings: Building[] }>());

export const fetchResearchedUnits = createAction(
  '[Settlement] Fetch researched units');

export const setResearchedUnits = createAction(
  '[Settlement] Set researched units', props<{ units: CombatUnit[]}>());

export const orderCombatUnits = createAction(
  '[Settlement] Order combat units', props<{ unitType: string; amount: number}>());

export const fetchCombatGroups = createAction(
  '[Settlement] Fetch combat groups');

export const setCombatGroups = createAction(
  '[Settlement] Set combat groups', props<{ groups: CombatGroupsMap; }>());

export const fetchMovementsBrief = createAction(
  '[Settlement] Fetch movements brief');

export const setMovementsBrief = createAction(
  '[Settlement] Set movements brief', props<{ brief: Map<string, TroopMovementsBrief>; }>());

export const checkSendingContract = createAction(
  '[Settlement] Check sending contract', props<{ attackRequest: CombatGroupSendingRequest}>());

export const setSendingContract = createAction(
  '[Settlement] Set sending contract', props<{ contract: CombatGroupSendingContract}>());

export const confirmTroopsSending = createAction(
  '[Settlement] Confirm troops sending', props<{ contract: CombatGroupSendingContract}>());

export const troopsSent = createAction(
  '[Settlement] Is troops sent', props<{ result: boolean}>());

export const errorSettlement = createAction('[Settlement] Error', props<{ error: string }>());
