import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {VillageView} from "../models/village-dto.model";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VillageService {
  baseUrl = environment.baseUrl;
  villageId = '';

  villageChanged = new Subject<VillageView>();

  constructor(private httpClient: HttpClient) { }

  getVillageById(villageId: string) {
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
        v.population, v.culture, v.approval, v.fields, v.buildings, storage,
        v.warehouseCapacity, v.granaryCapacity, v.homeLegion, producePerHour, v.eventsList
      );
    })).subscribe(village => {
      this.villageId = village.villageId;
      this.villageChanged.next(village);
      console.log(village);
    });
  }

  updateVillageName(newName: string){
    const url = `${this.baseUrl}/villages/${this.villageId}/update-name`;
    let params = new HttpParams().set('name', newName);
    return this.httpClient.put(url, {}, {responseType: "text", params: params});
  }

  upgradeField(villageId: string, fieldPosition: number) {
    const url = `${this.baseUrl}/villages/${villageId}/fields/${fieldPosition}/upgrade`;
    return this.httpClient.put<string>(url, {});
  }

  deleteBuildingEvent(villageId: string, eventId: string){
    const url = `${this.baseUrl}/villages/events/${eventId}`;
    this.httpClient.delete<string>(url).subscribe(() => {
      this.getVillageById(villageId);
    });
  }
}
