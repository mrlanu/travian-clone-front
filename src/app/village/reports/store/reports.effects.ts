import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as ReportsActions from "./reports.actions";
import {catchError, exhaustMap, map, withLatestFrom} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../../store/app.reducer";
import {userSelector} from "../../../auth/store/auth.selectors";
import {settlementIdSelector} from "../../store/settlement.selectors";
import {ReportBrief} from "../reports-list/reports-list.component";

@Injectable()
export class ReportsEffects {

  constructor(
    private httpClient: HttpClient,
    private actions$: Actions,
    private store: Store<fromAppStore.AppState>
  ) {}

  reportsBrief$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportsActions.fetchReportsBrief),
      withLatestFrom(this.store.select(settlementIdSelector)),
      withLatestFrom(this.store.select(userSelector)),
      exhaustMap(([[_, settlementId], user]) =>
        this.httpClient
          .get<ReportBrief[]>(`${environment.baseUrl}/reports`,
            {params: {'accountId': user!.userId, 'settlementId': settlementId!}})
          .pipe(map((reports) =>
              ReportsActions.setReportsBrief({reports})),
            catchError(error => of(ReportsActions.errorReports({error})))
          )
      )
    )
  );

  report$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportsActions.fetchReport),
      exhaustMap(action =>
        this.httpClient
          .get<any>(`${environment.baseUrl}/reports/${action.reportId}`)
          .pipe(map((report) =>
              ReportsActions.setReport({report})),
            catchError(error => of(ReportsActions.errorReports({error})))
          )
      )
    )
  );

  openReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportsActions.openReport),
      exhaustMap(action =>
        this.httpClient
          .put<any>(`${environment.baseUrl}/reports/read`, [action.report.id])
      )
    ), { dispatch: false }
  );

  readReports$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportsActions.readReports),
      exhaustMap(action =>
        this.httpClient
          .put<any>(`${environment.baseUrl}/reports/read`, action.reportsId)
          .pipe(map(() =>
              ReportsActions.editedReports()),
            catchError(error => of(ReportsActions.errorReports({error})))
          )
      )
    )
  );

  deleteReports$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportsActions.deleteReports),
      exhaustMap(action =>
        this.httpClient
          .put<any>(`${environment.baseUrl}/reports/delete`, action.reportsId)
          .pipe(map(() =>
              ReportsActions.editedReports()),
            catchError(error => of(ReportsActions.errorReports({error})))
          )
      )
    )
  );

  countNewReports$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportsActions.countNewReports),
      withLatestFrom(this.store.select(userSelector)),
      exhaustMap(([_, user]) =>
        this.httpClient
          .get<number>(`${environment.baseUrl}/reports/count-new`,
            {params: {'accountId': user!.userId}})
          .pipe(map(amount =>
              ReportsActions.setReportsAmount({amount})),
            catchError(error => of(ReportsActions.errorReports({error})))
          )
      )
    )
  );
}
