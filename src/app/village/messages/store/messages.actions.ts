import {createAction, props} from "@ngrx/store";
import {MessageBrief} from "../messages.component";

export const fetchMessages = createAction(
  '[Messages] Fetch messages');

export const setMessages = createAction(
  '[Messages] Set messages', props<{messages: MessageBrief[]}>());

export const errorStatistics = createAction('[Messages] Error', props<{ error: string }>());
