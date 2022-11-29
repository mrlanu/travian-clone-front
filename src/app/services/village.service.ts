import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MapTile} from "../models/village-dto.model";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Building} from "../village/all-buildings-list/all-buildings-list.component";
import {OrderCombatUnit} from "../village/building-details/barracks/barracks.component";
import {CombatUnit} from "../village/building-details/barracks/combat-unit/combat-unit.component";
import {
  CombatGroupSendingContract,
  CombatGroupSendingRequest
} from "../village/building-details/rally-point/rally-point.component";
import {MapPart, TileDetail} from "../village/map/map.component";
import {TroopMovementsBrief} from "../village/troop-movements-brief/troop-movements-brief.component";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../store/app.reducer";
import {fetchSettlement} from "../village/store/settlement.actions";

@Injectable({
  providedIn: 'root'
})
export class VillageService {
  baseUrl = environment.baseUrl;
  villageId = '';
  militaryOrdersChanged = new Subject<OrderCombatUnit[]>();
  partOfWorldChanged = new Subject<MapTile[]>();

  constructor(private httpClient: HttpClient, private store: Store<fromAppStore.AppState>) { }

  createNewBuilding(villageId: string, position: number, kind: string){
    const url = `${this.baseUrl}/villages/${villageId}/buildings/${position}/new`;
    let params = new HttpParams().set('kind', kind);
    return this.httpClient.put(url, {}, {responseType: "text", params: params});
  }

  deleteBuildingEvent(villageId: string, eventId: string){
    const url = `${this.baseUrl}/villages/${villageId}/events/${eventId}`;
    this.httpClient.delete<string>(url).subscribe(() => {
      this.store.dispatch(fetchSettlement({id: villageId}));
    });
  }

  getListOfAllNewBuildings(villageId: string){
    const url = `${this.baseUrl}/villages/${villageId}/buildings`;
    return this.httpClient.get<Building[]>(url);
  }

  getAllResearchedUnits(villageId: string){
    const url = `${this.baseUrl}/villages/${villageId}/military/researched`;
    return this.httpClient.get<CombatUnit[]>(url);
  }

  orderCombatUnits(villageId: string, unitType: string, amount: number){
    const url = `${this.baseUrl}/villages/military`;
    this.httpClient.post(url, {'villageId': villageId, 'unitType': unitType, 'amount': amount})
      .subscribe(() => {
      this.getAllOrdersCombatUnit(villageId);
        this.store.dispatch(fetchSettlement({id: villageId}));
    })
  }

  getAllOrdersCombatUnit(villageId: string){
    const url = `${this.baseUrl}/villages/${villageId}/military-orders`;
    this.httpClient.get<OrderCombatUnit[]>(url).subscribe(res => {
      let militaryOrders: OrderCombatUnit[] = res.map(order => {
        return new OrderCombatUnit(order.unit, order.amount, order.duration, order.eachDuration, order.endOrder);
      });
      this.militaryOrdersChanged.next(militaryOrders);
    });
  }

  getAllCombatGroups(villageId: string) {
    const url = `${this.baseUrl}/villages/${villageId}/combat-group`;
    return this.httpClient.get<any>(url);
  }

  getTroopMovements(villageId: string) {
    const url = `${this.baseUrl}/villages/${villageId}/troop-movements`;
    return this.httpClient.get(url)
      .pipe(map(o => {
        let result = new Map<string, TroopMovementsBrief>();
        for(const [key, value] of Object.entries(o)){
        result.set(key, new TroopMovementsBrief(value.count, value.timeToArrive));
      }
      return result;
    }));
  }

  checkTroopsSendingRequest(attackRequest: CombatGroupSendingRequest){
    const url = `${this.baseUrl}/villages/check-troops-send`;
    return this.httpClient.post<CombatGroupSendingContract>(url, attackRequest)
      .pipe(map(mU => new CombatGroupSendingContract(mU.id, mU.nation, mU.move, mU.mission, mU.originVillageId,
        mU.originVillageName, mU.originPlayerName, mU.originVillageCoordinates, mU.currentLocationVillageId,
        mU.targetVillageId, mU.targetVillageName, mU.targetPlayerName, mU.targetVillageCoordinates,
      mU.units, mU.arrivalTime ? new Date(mU.arrivalTime) : null, mU.duration, mU.expensesPerHour)
    ));
  }

  sendConfirmedTroops(militaryUnit: CombatGroupSendingContract){
    const url = `${this.baseUrl}/villages/troops-send`;
    return this.httpClient.post<any>(url, militaryUnit);
  }

  getPartOfMap(mapPart: MapPart){
    const url = `${this.baseUrl}/world/map-part`;
    this.httpClient.post<MapTile[]>(url, mapPart)
      .subscribe(res => {
        console.log(res);
        this.partOfWorldChanged.next(res);
      })
  }

  getTileDetail(id: string, fromX: number, fromY: number){
    const url = `${this.baseUrl}/world/tile-detail/${id}/${fromX}/${fromY}`;
    return this.httpClient.get<TileDetail>(url)
      .pipe(map(
        tile => new TileDetail(tile.id, tile.type, tile.subType, tile.nation, tile.playerName, tile.name,
          tile.x, tile.y, tile.population, tile.distance))
      );
  }
}
