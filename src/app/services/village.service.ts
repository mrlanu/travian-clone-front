import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MapTile} from "../models/village-dto.model";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {
  CombatGroupSendingContract,
  CombatGroupSendingRequest
} from "../village/building-details/rally-point/rally-point.component";
import {MapPart, TileDetail} from "../village/map/map.component";
import {TroopMovementsBrief} from "../village/troop-movements-brief/troop-movements-brief.component";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../store/app.reducer";

@Injectable({
  providedIn: 'root'
})
export class VillageService {
  baseUrl = environment.baseUrl;
  villageId = '';
  partOfWorldChanged = new Subject<MapTile[]>();

  constructor(private httpClient: HttpClient, private store: Store<fromAppStore.AppState>) { }

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
