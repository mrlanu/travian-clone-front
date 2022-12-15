import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as StatisticsActions from "./statistics.actions";
import {catchError, exhaustMap, map, withLatestFrom} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../store/app.reducer";
import {userSelector} from "../../../auth/store/auth.selectors";
import {StatsInfo} from "../statistics.component";

@Injectable()
export class StatisticsEffects {

  constructor(
    private httpClient: HttpClient,
    private actions$: Actions,
    private store: Store<fromAppStore.AppState>
  ) {}

  statistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatisticsActions.fetchStatistics),
      withLatestFrom(this.store.select(userSelector)),
      exhaustMap(([_, user]) =>
        this.httpClient
          .get<StatsInfo>(`${environment.baseUrl}/statistics/${user!.statisticsId}`)
          .pipe(map(response => StatisticsActions.setStatistics({statistics: response})),
            catchError(error => of(StatisticsActions.errorStatistics({error})))
          )
      )
    )
  );
}
