import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map, take, withLatestFrom} from "rxjs/operators";
import * as SettlementActions from './settlement.actions';
import {of} from "rxjs";
import {ShortVillageInfo, VillageView} from "../../models/village-dto.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {settlementIdSellector, settlementSelector} from "./settlement.selectors";
import {Building} from "../all-buildings-list/all-buildings-list.component";

@Injectable()
export class SettlementEffects {
  settlement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.fetchSettlement),
      exhaustMap(action =>
        this.httpClient
          .get<VillageView>(`${environment.baseUrl}/villages/${action.id}`)
          .pipe(map(v => SettlementActions.setSettlement({ settlement: v })),
          catchError(error => of(SettlementActions.errorSettlement({ error })))
        )
      )
    )
  );

  settlementsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.fetchSettlementsList),
      exhaustMap(action =>
        this.httpClient.get<ShortVillageInfo[]>(`${environment.baseUrl}/users/${action.userId}/villages`)
          .pipe(map(list => SettlementActions.setSettlementsList({ list })),
            catchError(error => of(SettlementActions.errorSettlement({ error })))
          )
      )
    )
  );

  newBuilding$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.buildNewBuilding),
      withLatestFrom(this.store.select(settlementIdSellector)),
      exhaustMap(([action, settlementId]) => {
        let params = new HttpParams().set('kind', action.kind);
        return this.httpClient
          .put(`${environment.baseUrl}/villages/${settlementId}/buildings/${action.position}/new`,
            {}, {responseType: "text", params: params})
          .pipe(map(() => SettlementActions.fetchSettlement({ id: settlementId! })),
            catchError(error => of(SettlementActions.errorSettlement({ error })))
          )
      })
    )
  );

  upgrade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.upgradeBuilding),
      withLatestFrom(this.store.select(settlementIdSellector)),
      exhaustMap(([action, settlementId]) =>
        this.httpClient
          .put<string>(`${environment.baseUrl}/villages/${settlementId}/buildings/${action.position}/upgrade`, {})
          .pipe(map(() => SettlementActions.fetchSettlement({ id: settlementId! })),
            catchError(error => of(SettlementActions.errorSettlement({ error })))
          )
      )
    )
  );

  updateName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.updateName),
      withLatestFrom(this.store.select(settlementSelector)),
      exhaustMap(([a, settlement]) => {
        let params = new HttpParams().set('name', a.newName);
        return this.httpClient
          .put(`${environment.baseUrl}/villages/${settlement!.villageId}/update-name`, {}, {responseType: "text", params: params})
          .pipe(map(() => SettlementActions.fetchSettlementsList({userId: settlement!.accountId})),
            catchError(error => of(SettlementActions.errorSettlement({error})))
          )
      })
    )
  );

  deleteBuildEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.deleteBuildEvent),
      withLatestFrom(this.store.select(settlementIdSellector)),
      exhaustMap(([action, settlementId]) =>
        this.httpClient
          .delete<string>(`${environment.baseUrl}/villages/${settlementId}/events/${action.eventId}`, {})
          .pipe(map(() => SettlementActions.fetchSettlement({ id: settlementId! })),
            catchError(error => of(SettlementActions.errorSettlement({ error })))
          )
      )
    )
  );

  availableBuildings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.fetchAvailableBuildings),
      withLatestFrom(this.store.select(settlementSelector)),
      exhaustMap(([_, settlement]) =>
        this.httpClient
          .get<Building[]>(`${environment.baseUrl}/villages/${settlement!.villageId}/buildings`)
          .pipe(map((buildings) =>
              SettlementActions.setAvailableBuildings({buildings: this.mapBuildings(buildings)})),
            catchError(error => of(SettlementActions.errorSettlement({error})))
          )
      )
    )
  );

  constructor(
    private httpClient: HttpClient,
    private actions$: Actions,
    private store: Store<fromAppStore.AppState>
  ) {}

  private mapBuildings(buildingsList: Building[]): Building[] {
    return  buildingsList.map(b => {
      let cost = new Map<string, number>();
      for(const [key, value] of Object.entries(b.cost)){
        cost.set(key, value);
      }
      let req = b.requirements.map(r => {
        return {...r};
      });
      return new Building(b.name, b.kind, b.type, b.description, cost, b.time, req, b.available);
    });
  }
}
