import {createAction, props} from "@ngrx/store";
import {Message, MessageBrief} from "../messages.component";
import {MessageSendRequest} from "../message-write/message-write.component";

export const fetchMessages = createAction(
  '[Messages] Fetch messages');

export const fetchMessage = createAction(
  '[Messages] Fetch message', props<{messageId: string}>());

export const fetchSentMessages = createAction(
  '[Messages] Fetch sent messages');

export const setMessage = createAction(
  '[Messages] Set message', props<{message: Message}>());

export const setMessages = createAction(
  '[Messages] Set messages', props<{messages: MessageBrief[]}>());

export const setSentMessages = createAction(
  '[Messages] Set sent messages', props<{messages: MessageBrief[]}>());

export const sendMessage = createAction(
  '[Messages] Send message', props<{message: MessageSendRequest}>());

export const messageSent = createAction(
  '[Messages] Message sent');

export const errorStatistics = createAction('[Messages] Error', props<{ error: string }>());
