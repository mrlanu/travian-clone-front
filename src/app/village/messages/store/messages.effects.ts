import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as MessagesActions from "./messages.actions";
import {catchError, exhaustMap, map, withLatestFrom} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../store/app.reducer";
import {userSelector} from "../../../auth/store/auth.selectors";
import {Message, MessageBrief} from "../messages.component";

@Injectable()
export class MessagesEffects {

  constructor(
    private httpClient: HttpClient,
    private actions$: Actions,
    private store: Store<fromAppStore.AppState>
  ) {}

  messages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.fetchMessages),
      withLatestFrom(this.store.select(userSelector)),
      exhaustMap(([_, user]) => {
        return this.httpClient
          .get<MessageBrief[]>(`${environment.baseUrl}/messages`,
            {params: {'clientId': user!.userId, 'sent': false}})
          .pipe(map(response => MessagesActions.setMessages({messages: response})),
            catchError(error => of(MessagesActions.errorStatistics({error})))
          )
      })
    )
  );

  messagesSent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.fetchSentMessages),
      withLatestFrom(this.store.select(userSelector)),
      exhaustMap(([_, user]) => {
        return this.httpClient
          .get<MessageBrief[]>(`${environment.baseUrl}/messages`,
            {params: {'clientId': user!.userId, 'sent': true}})
          .pipe(map(response => MessagesActions.setSentMessages({messages: response})),
            catchError(error => of(MessagesActions.errorStatistics({error})))
          )
      })
    )
  );

  message$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.fetchMessage),
      exhaustMap(action => {
        return this.httpClient
          .get<Message>(`${environment.baseUrl}/messages/${action.messageId}`)
          .pipe(map(message => MessagesActions.setMessage({message})),
            catchError(error => of(MessagesActions.errorStatistics({error})))
          )
      })
    )
  );

  messageSend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.sendMessage),
      withLatestFrom(this.store.select(userSelector)),
      exhaustMap(([action, user]) => {
        let message = {...action.message, senderId: user!.userId, senderName: user!.username};
        return this.httpClient
          .post<any>(`${environment.baseUrl}/messages`, message)
          .pipe(map(response => MessagesActions.messageSent()),
            catchError(error => of(MessagesActions.errorStatistics({error})))
          )
      })
    )
  );
}
