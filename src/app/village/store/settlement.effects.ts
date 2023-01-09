import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map, tap, withLatestFrom} from "rxjs/operators";
import * as SettlementActions from './settlement.actions';
import {of} from "rxjs";
import {ShortVillageInfo, VillageView} from "../../models/village-dto.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {settlementIdSelector, settlementSelector} from "./settlement.selectors";
import {Building} from "../all-buildings-list/all-buildings-list.component";
import {CombatUnit} from "../building-details/barracks/combat-unit/combat-unit.component";
import {CombatGroupSendingContract} from "../building-details/rally-point/rally-point.component";
import {userSelector} from "../../auth/store/auth.selectors";
import {Router} from "@angular/router";

@Injectable()
export class SettlementEffects {
  settlementFirstTime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.fetchSettlementFirstTime),
      exhaustMap(action =>
        this.httpClient
          .get<VillageView>(`${environment.baseUrl}/villages/${action.id}`)
          .pipe(map(v => SettlementActions.setSettlement({ settlement: v })),
          catchError(error => of(SettlementActions.errorSettlement({ error })))
        )
      )
    )
  );

  settlement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.fetchSettlement),
      withLatestFrom(this.store.select(settlementSelector)),
      exhaustMap(([_, settlement]) =>
        this.httpClient
          .get<VillageView>(`${environment.baseUrl}/villages/${settlement!.villageId}`)
          .pipe(map((settlement) =>
              SettlementActions.setSettlement({settlement: settlement})),
            catchError(error => of(SettlementActions.errorSettlement({error})))
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
      withLatestFrom(this.store.select(settlementIdSelector)),
      exhaustMap(([action, settlementId]) => {
        let params = new HttpParams().set('kind', action.kind);
        return this.httpClient
          .put<VillageView>(`${environment.baseUrl}/villages/${settlementId}/buildings/${action.position}/new`,
            {}, {params})
          .pipe(map(settlement => SettlementActions.setSettlement({settlement})),
            catchError(error => of(SettlementActions.errorSettlement({ error })))
          )
      })
    )
  );

  upgrade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.upgradeBuilding),
      withLatestFrom(this.store.select(settlementIdSelector)),
      exhaustMap(([action, settlementId]) =>
        this.httpClient
          .put<VillageView>(`${environment.baseUrl}/villages/${settlementId}/buildings/${action.position}/upgrade`, {})
          .pipe(map(settlement => SettlementActions.setSettlement({settlement})),
            catchError(error => of(SettlementActions.errorSettlement({ error })))
          )
      )
    )
  );

  redirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.redirectAfterBuilding),
      withLatestFrom(this.store.select(settlementIdSelector)),
      tap(([_, settlementId]) => this.router.navigate(['villages', settlementId, 'fields'])
      )
    ), {dispatch: false}
  );

  updateName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.updateName),
      withLatestFrom(this.store.select(settlementSelector)),
      exhaustMap(([a, settlement]) => {
        let params = new HttpParams().set('name', a.newName);
        return this.httpClient
          .put<VillageView>(`${environment.baseUrl}/villages/${settlement!.villageId}/update-name`, {}, {params})
          .pipe(map(settlement => SettlementActions.nameUpdated({settlement})),
            catchError(error => of(SettlementActions.errorSettlement({error})))
          )
      })
    )
  );

  settlementsListAfterNameUpdated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.nameUpdated),
      withLatestFrom(this.store.select(userSelector)),
      exhaustMap(([_, user]) =>
        this.httpClient.get<ShortVillageInfo[]>(`${environment.baseUrl}/users/${user!.userId}/villages`)
          .pipe(map(list => SettlementActions.setSettlementsList({ list })),
            catchError(error => of(SettlementActions.errorSettlement({ error })))
          )
      )
    )
  );

  deleteBuildEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.deleteBuildEvent),
      withLatestFrom(this.store.select(settlementIdSelector)),
      exhaustMap(([action, settlementId]) =>
        this.httpClient
          .delete<VillageView>(`${environment.baseUrl}/villages/${settlementId}/events/${action.eventId}`)
          .pipe(map(settlement => SettlementActions.setSettlement({settlement})),
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

  researchedUnits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.fetchResearchedUnits),
      withLatestFrom(this.store.select(settlementIdSelector)),
      exhaustMap(([_, settlementId]) =>
        this.httpClient
          .get<CombatUnit[]>(`${environment.baseUrl}/villages/${settlementId}/military/researched`)
          .pipe(map((units) =>
              SettlementActions.setResearchedUnits({units})),
            catchError(error => of(SettlementActions.errorSettlement({error})))
          )
      )
    )
  );

  orderCombatUnits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.orderCombatUnits),
      withLatestFrom(this.store.select(settlementIdSelector)),
      exhaustMap(([action, settlementId]) =>
        this.httpClient
          .post<VillageView>(`${environment.baseUrl}/villages/${settlementId}/military`,
            {'unitType': action.unitType, 'amount': action.amount})
          .pipe(map((settlement) =>
              SettlementActions.setSettlement({settlement})),
            catchError(error => of(SettlementActions.errorSettlement({error})))
          )
      )
    )
  );

  checkSendingContract$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.checkSendingContract),
      withLatestFrom(this.store.select(settlementIdSelector)),
      exhaustMap(([action, settlementId]) =>
        this.httpClient
          .post<CombatGroupSendingContract>(`${environment.baseUrl}/villages/${settlementId}/check-troops-send`,
            action.attackRequest)
          .pipe(map((mU) => {
              let result = new CombatGroupSendingContract(mU.id, mU.savedEntityId, mU.move, mU.mission, mU.targetVillageId,
                mU.targetVillageName, mU.targetPlayerName, mU.targetVillageCoordinates, mU.units,
                mU.arrivalTime ? new Date(mU.arrivalTime) : null, mU.duration);
              return SettlementActions.setSendingContract({contract: result})}),
            catchError(error => of(SettlementActions.errorSettlement({error})))
          )
      )
    )
  );

  confirmTroopsSending$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.confirmTroopsSending),
      withLatestFrom(this.store.select(settlementIdSelector)),
      exhaustMap(([action, settlementId]) =>
        this.httpClient
          .post<boolean>(`${environment.baseUrl}/villages/${settlementId}/troops-send/${action.contract.savedEntityId}`, '')
          .pipe(map((result) =>
              SettlementActions.troopsSent({result})),
            catchError(error => of(SettlementActions.errorSettlement({error})))
          )
      )
    )
  );

  constructor(
    private httpClient: HttpClient,
    private actions$: Actions,
    private store: Store<fromAppStore.AppState>,
    private router: Router
  ) {}

  private mapBuildings(buildingsList: Building[]): Building[] {
    return  buildingsList.map(b => {
      let req = b.requirements.map(r => {
        return {...r};
      });
      return new Building(b.name, b.kind, b.type, b.description, b.cost, b.time, req, b.available);
    });
  }
}
