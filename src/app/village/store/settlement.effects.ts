import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map, withLatestFrom} from "rxjs/operators";
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
import {TroopMovementsBrief} from "../troop-movements-brief/troop-movements-brief.component";
import {CombatGroupSendingContract} from "../building-details/rally-point/rally-point.component";

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
          .put(`${environment.baseUrl}/villages/${settlementId}/buildings/${action.position}/new`,
            {}, {responseType: "text", params: params})
          .pipe(map(() => SettlementActions.fetchSettlementFirstTime({ id: settlementId! })),
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
          .put<string>(`${environment.baseUrl}/villages/${settlementId}/buildings/${action.position}/upgrade`, {})
          .pipe(map(() => SettlementActions.fetchSettlementFirstTime({ id: settlementId! })),
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
      withLatestFrom(this.store.select(settlementIdSelector)),
      exhaustMap(([action, settlementId]) =>
        this.httpClient
          .delete<string>(`${environment.baseUrl}/villages/${settlementId}/events/${action.eventId}`, {})
          .pipe(map(() => SettlementActions.fetchSettlementFirstTime({ id: settlementId! })),
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
          .post<VillageView>(`${environment.baseUrl}/villages/military`,
            {'villageId': settlementId, 'unitType': action.unitType, 'amount': action.amount})
          .pipe(map((settlement) =>
              SettlementActions.setSettlement({settlement})),
            catchError(error => of(SettlementActions.errorSettlement({error})))
          )
      )
    )
  );

  combatGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.fetchCombatGroups),
      withLatestFrom(this.store.select(settlementIdSelector)),
      exhaustMap(([_, settlementId]) =>
        this.httpClient
          .get<any>(`${environment.baseUrl}/villages/${settlementId}/combat-group`)
          .pipe(map((groups) =>
              SettlementActions.setCombatGroups({groups})),
            catchError(error => of(SettlementActions.errorSettlement({error})))
          )
      )
    )
  );

  movementsBrief$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.fetchMovementsBrief),
      withLatestFrom(this.store.select(settlementIdSelector)),
      exhaustMap(([_, settlementId]) =>
        this.httpClient
          .get(`${environment.baseUrl}/villages/${settlementId}/troop-movements`)
          .pipe(map((brief) => {
            let result = new Map<string, TroopMovementsBrief>();
            for(const [key, value] of Object.entries(brief)){
              result.set(key, new TroopMovementsBrief(value.count, value.timeToArrive));
            }
            return SettlementActions.setMovementsBrief({brief: result})}),
            catchError(error => of(SettlementActions.errorSettlement({error})))
          )
      )
    )
  );

  checkSendingContract$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.checkSendingContract),
      exhaustMap(action =>
        this.httpClient
          .post<CombatGroupSendingContract>(`${environment.baseUrl}/villages/check-troops-send`, action.attackRequest)
          .pipe(map((mU) => {
              let result = new CombatGroupSendingContract(mU.id, mU.nation, mU.move, mU.mission, mU.originVillageId,
                mU.originVillageName, mU.originPlayerName, mU.originVillageCoordinates, mU.currentLocationVillageId,
                mU.targetVillageId, mU.targetVillageName, mU.targetPlayerName, mU.targetVillageCoordinates,
                mU.units, mU.arrivalTime ? new Date(mU.arrivalTime) : null, mU.duration, mU.expensesPerHour)
              return SettlementActions.setSendingContract({contract: result})}),
            catchError(error => of(SettlementActions.errorSettlement({error})))
          )
      )
    )
  );

  confirmTroopsSending$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.confirmTroopsSending),
      exhaustMap(action =>
        this.httpClient
          .post<boolean>(`${environment.baseUrl}/villages/troops-send`, action.contract)
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
