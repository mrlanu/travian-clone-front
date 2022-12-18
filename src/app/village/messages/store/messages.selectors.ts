import {createSelector} from "@ngrx/store";
import * as fromMessages from "./messages.reducer";
import * as fromApp from "../../../store/app.reducer";

const messages = (state: fromApp.AppState) => state.messages;

export const messagesSelector = createSelector(
  messages,
  (state: fromMessages.State) => state.list
);

export const messagesSentSelector = createSelector(
  messages,
  (state: fromMessages.State) => state.listSent
);

export const messageSelector = createSelector(
  messages,
  (state: fromMessages.State) => state.current
);

export const editedMessagesSelector = createSelector(
  messages,
  (state: fromMessages.State) => state.editedMessages
);

export const amountNewMessagesSelector = createSelector(
  messages,
  (state: fromMessages.State) => state.newMessagesAmount
);

