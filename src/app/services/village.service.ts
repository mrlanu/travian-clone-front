import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VillageView} from "../models/village-dto.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VillageService {
  baseUrl = 'http://localhost:8080/api';
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
        v.population, v.culture, v.fields, v.buildings, storage,
        v.warehouseCapacity, v.granaryCapacity, v.homeLegion, producePerHour, v.eventsList
      );
    })).subscribe(village => {
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
      this.getVillageById(villageId);
    })
  }
}
