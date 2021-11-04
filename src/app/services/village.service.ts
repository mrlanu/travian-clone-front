import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EUnits, VillageView} from "../models/village-dto.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VillageService {
  baseUrl = 'http://localhost:8080/api';
  villageId = '618016eefac3034ad72ace94';

  villageChanged = new Subject<VillageView>();
  /*currentVillage: VillageView = {
    accountId: "",
    buildings: [],
    culture: 0,
    eventsList: [],
    fields: [],
    homeLegion: new Map<EUnits, number>(),
    name: "",
    population: 0,
    producePerHour: new Map<string, number>(),
    storage: new Map<string, number>(),
    warehouseCapacity: 0,
    granaryCapacity: 0,
    villageId: "",
    villageType: "",
    x: 0,
    y: 0
  };*/

  constructor(private httpClient: HttpClient) { }

  getVillageById(villageId: string) {
    this.villageId = villageId;
    const url = `${this.baseUrl}/villages/${villageId}`;
    this.httpClient.get<VillageView>(url).pipe(map(v => {
      let producePerHour = new Map<string, number>();
      let storage = new Map<string, number>();

      for(const [key, value] of Object.entries(v.producePerHour)){
        producePerHour.set(key, value);
      }
      for(const [key, value] of Object.entries(v.storage)){
        storage.set(key, value);
      }
      return new VillageView(
        v.villageId, v.accountId, v.name, v.x, v.y, v.villageType,
        v.population, v.culture, v.fields, v.buildings, storage,
        v.warehouseCapacity, v.granaryCapacity, v.homeLegion, producePerHour, v.eventsList
      );
    })).subscribe(village => {
      console.log(village.buildings[2]['name']);
      /*this.currentVillage = village;*/
      this.villageChanged.next(village);
    });
  }

  upgradeField(villageId: string, fieldPosition: number) {
    const url = `${this.baseUrl}/villages/${villageId}/fields/${fieldPosition}/upgrade`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    this.httpClient.put<string>(url, {}, httpOptions).subscribe(() => {

    });
  }

  deleteBuildingEvent(eventId: string){
    const url = `${this.baseUrl}/villages/events/${eventId}`;
    this.httpClient.delete<string>(url).subscribe(() => {
      this.getVillageById(this.villageId);
    });
  }
}
