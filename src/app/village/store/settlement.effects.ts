import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map} from "rxjs/operators";
import * as SettlementActions from './settlement.actions';
import {of} from "rxjs";
import {ShortVillageInfo, VillageView} from "../../models/village-dto.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class SettlementEffects {
  settlement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.fetchSettlement),
      exhaustMap(action =>
        this.httpClient
          .get<VillageView>(`${environment.baseUrl}/villages/${action.id}`)
          .pipe(map(v => SettlementActions.setSettlement({ settlement: this.mapView(v) })),
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

  upgrade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementActions.upgradeBuilding),
      exhaustMap(action =>
        this.httpClient
          .put<string>(`${environment.baseUrl}/villages/${action.villageId}/buildings/${action.position}/upgrade`, {})
          .pipe(map(() => SettlementActions.fetchSettlement({ id: action.villageId })),
            catchError(error => of(SettlementActions.errorSettlement({ error })))
          )
      )
    )
  );

  constructor(
    private httpClient: HttpClient,
    private actions$: Actions,
  ) {}

  private mapView(village: VillageView): VillageView {
    let producePerHour = new Map<string, number>();
    let storage = new Map<string, number>();
    let homeLegion = new Map<string, number>();

    for(const [key, value] of Object.entries(village.producePerHour)){
      producePerHour.set(key, value);
    }
    for(const [key, value] of Object.entries(village.storage)){
      storage.set(key, value);
    }
    for(const [key, value] of Object.entries(village.homeLegion)){
      // PHALANX -> Phalanx
      homeLegion.set(this.capitalizeFirstLater(key), value);
    }
    return  new VillageView(village.villageId, village.accountId, village.nation, village.name,
      village.x, village.y, village.villageType, village.population, village.culture, village.approval,
      village.buildings, storage, village.warehouseCapacity, village.granaryCapacity, homeLegion,
      village.homeUnits, producePerHour, village.eventsList
    );
  }

  private capitalizeFirstLater(str: string): string{
    let allToLower = str.toLowerCase();
    return allToLower.charAt(0).toUpperCase() + allToLower.slice(1);
  }
}
