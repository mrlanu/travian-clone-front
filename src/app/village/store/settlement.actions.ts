import { createAction, props } from '@ngrx/store';
import {VillageView} from "../../models/village-dto.model";

export const setSettlement = createAction(
  '[Settlement] Set', props<{ settlement: VillageView }>());


export const fetchSettlement = createAction(
  '[Settlement] Fetch', props<{ id: string; }>());

export const errorSettlement = createAction('[Settlement] Error', props<{ error: string }>());
