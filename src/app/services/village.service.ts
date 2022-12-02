import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MapTile} from "../models/village-dto.model";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {MapPart, TileDetail} from "../village/map/map.component";

@Injectable({
  providedIn: 'root'
})
export class VillageService {
  baseUrl = environment.baseUrl;
  villageId = '';
  partOfWorldChanged = new Subject<MapTile[]>();

  constructor(private httpClient: HttpClient) { }

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
