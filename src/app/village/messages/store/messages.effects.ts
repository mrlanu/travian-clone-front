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
import {MessageBrief} from "../messages.component";

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
          .get<MessageBrief[]>(`${environment.baseUrl}/messages/${user!.userId}`)
          .pipe(map(response => MessagesActions.setMessages({messages: response})),
            catchError(error => of(MessagesActions.errorStatistics({error})))
          )
      })
    )
  );
}
