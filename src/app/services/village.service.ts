import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {VillageView} from "../models/village-dto.model";
import {FieldUpgradeRequest} from "../models/field-upgrade-request.model";

@Injectable({
  providedIn: 'root'
})
export class VillageService {
  baseUrl = 'http://localhost:8080/api';
  villageChanged = new Subject<VillageView>();

  constructor(private httpClient: HttpClient) { }

  getVillageById(villageId: string) {
    const url = `${this.baseUrl}/villages/${villageId}`;
    this.httpClient.get<VillageView>(url).subscribe(village => {
      this.villageChanged.next(village);
    });
  }

  upgradeField(villageId: string, fieldPosition: number) {
    const url = `${this.baseUrl}/villages/${villageId}/fields/${fieldPosition}/upgrade`;
    return this.httpClient.put<string>(url, {});
  }

  getTime(sec: number) {
    const url = `${this.baseUrl}/villages/get-time/${sec}`;
    return this.httpClient.get(url);
  }
}
