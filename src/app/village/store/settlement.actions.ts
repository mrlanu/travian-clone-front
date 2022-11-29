import { createAction, props } from '@ngrx/store';
import {ShortVillageInfo, VillageView} from "../../models/village-dto.model";
import {Building} from "../all-buildings-list/all-buildings-list.component";

export const setSettlement = createAction(
  '[Settlement] Set', props<{ settlement: VillageView }>());

export const fetchSettlement = createAction(
  '[Settlement] Fetch', props<{ id: string; }>());

export const fetchSettlementsList = createAction(
  '[Settlement] Fetch List', props<{ userId: string; }>());

export const setSettlementsList = createAction(
  '[Settlement] Set settlements list', props<{ list: ShortVillageInfo[] }>());

export const upgradeBuilding = createAction(
  '[Settlement] Upgrade building', props<{ villageId: string; position: number }>());

export const updateName = createAction(
  '[Settlement] Update name', props<{ newName: string}>());

export const fetchAvailableBuildings = createAction(
  '[Settlement] Fetch available buildings');

export const setAvailableBuildings = createAction(
  '[Settlement] Set available buildings', props<{ buildings: Building[] }>());

export const errorSettlement = createAction('[Settlement] Error', props<{ error: string }>());
