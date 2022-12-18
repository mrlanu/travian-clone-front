import {createReducer, on} from '@ngrx/store';
import * as MessagesActions from './messages.actions';
import {Message, MessageBrief} from "../messages.component";

export interface State {
  current: Message | undefined;
  list: MessageBrief[];
}

export const initialState: State = {
  current: undefined,
  list: [],
};

export const messagesReducer = createReducer(
  initialState,
  on(MessagesActions.setMessages, (state, { messages }) => (
    { ...state, list: messages }
  )),
  on(MessagesActions.setMessage, (state, { message }) => (
    { ...state, current: message }
  )),
);
