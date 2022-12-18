import {createReducer, on} from '@ngrx/store';
import * as MessagesActions from './messages.actions';
import {Message, MessageBrief} from "../messages.component";

export interface State {
  current: Message | undefined;
  list: MessageBrief[];
  listSent: MessageBrief[];
  editedMessages: boolean;
  newMessagesAmount: number;
}

export const initialState: State = {
  current: undefined,
  list: [],
  listSent: [],
  editedMessages: false,
  newMessagesAmount: 0,

};

export const messagesReducer = createReducer(
  initialState,
  on(MessagesActions.setMessages, (state, { messages }) => (
    { ...state, list: messages }
  )),
  on(MessagesActions.setSentMessages, (state, { messages }) => (
    { ...state, listSent: messages }
  )),
  on(MessagesActions.setMessage, (state, { message }) => (
    { ...state, current: message }
  )),
  on(MessagesActions.setMessagesAmount, (state, { amount }) => (
    { ...state, newMessagesAmount: amount }
  )),
  on(MessagesActions.editedMessages, (state) => (
    { ...state, editedMessages: !state.editedMessages }
  )),
);
