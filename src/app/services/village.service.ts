import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {EUnits, ShortVillageInfo, VillageView} from "../models/village-dto.model";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Building} from "../village/all-buildings-list/all-buildings-list.component";
import {MilitaryOrder, MilitaryUnit} from "../village/building-details/barracks/barracks.component";

@Injectable({
  providedIn: 'root'
})
export class VillageService {
  baseUrl = environment.baseUrl;
  villageId = '';
  currentVillage = new BehaviorSubject<VillageView | null>(null);
  villageChanged = new Subject<VillageView>();
  militaryOrdersChanged = new Subject<MilitaryOrder[]>();
  villagesList = new BehaviorSubject<ShortVillageInfo[]>([]);

  constructor(private httpClient: HttpClient) { }

  getAllVillagesByUser(userId: string){
    this.httpClient.get<ShortVillageInfo[]>(this.baseUrl + '/users/' + userId + '/villages')
      .subscribe(list => {
        this.villagesList.next(list);
      });
  }

  getVillageById(villageId: string) {
    const url = `${this.baseUrl}/villages/${villageId}`;
    this.httpClient.get<VillageView>(url).pipe(map(v => {
      let producePerHour = new Map<string, number>();
      let storage = new Map<string, number>();
      let homeLegion = new Map<string, number>();

      for(const [key, value] of Object.entries(v.producePerHour)){
        producePerHour.set(key, value);
      }
      for(const [key, value] of Object.entries(v.storage)){
        storage.set(key, value);
      }
      for(const [key, value] of Object.entries(v.homeLegion)){
        // PHALANX -> Phalanx
        homeLegion.set(this.capitalizeFirstLater(key), value);
      }
      return new VillageView(
        v.villageId, v.accountId, v.name, v.x, v.y, v.villageType,
        v.population, v.culture, v.approval, v.buildings, storage,
        v.warehouseCapacity, v.granaryCapacity, homeLegion, producePerHour, v.eventsList
      );
    })).subscribe(village => {
      this.villageId = village.villageId;
      this.getAllVillagesByUser(village.accountId);
      this.villageChanged.next(village);
      this.currentVillage.next(village);
      console.log(village);
    });
  }

  private capitalizeFirstLater(str: string): string{
    let allToLower = str.toLowerCase();
    return allToLower.charAt(0).toUpperCase() + allToLower.slice(1);
  }

  updateVillageName(newName: string){
    const url = `${this.baseUrl}/villages/${this.villageId}/update-name`;
    let params = new HttpParams().set('name', newName);
    return this.httpClient.put(url, {}, {responseType: "text", params: params});
  }

  createNewBuilding(villageId: string, position: number, kind: string){
    const url = `${this.baseUrl}/villages/${villageId}/buildings/${position}/new`;
    let params = new HttpParams().set('kind', kind);
    return this.httpClient.put(url, {}, {responseType: "text", params: params});
  }

  upgradeField(villageId: string, position: number) {
    const url = `${this.baseUrl}/villages/${villageId}/buildings/${position}/upgrade`;
    return this.httpClient.put<string>(url, {});
  }

  deleteBuildingEvent(villageId: string, eventId: string){
    const url = `${this.baseUrl}/villages/${villageId}/events/${eventId}`;
    this.httpClient.delete<string>(url).subscribe(() => {
      this.getVillageById(villageId);
    });
  }

  getListOfAllNewBuildings(villageId: string){
    const url = `${this.baseUrl}/villages/${villageId}/buildings`;
    return this.httpClient.get<Building[]>(url);
  }

  getAllResearchedUnits(villageId: string){
    const url = `${this.baseUrl}/villages/${villageId}/military/researched`;
    return this.httpClient.get<MilitaryUnit[]>(url);
  }

  orderMilitaryUnits(villageId: string, unitType: string, amount: number){
    const url = `${this.baseUrl}/villages/military`;
    this.httpClient.post(url, {'villageId': villageId, 'unitType': unitType, 'amount': amount})
      .subscribe(res => {
      this.getAllMilitaryOrders(villageId);
      this.getVillageById(villageId);
    })
  }

  getAllMilitaryOrders(villageId: string){
    const url = `${this.baseUrl}/villages/${villageId}/military-orders`;
    this.httpClient.get<MilitaryOrder[]>(url).subscribe(res => {
      let militaryOrders: MilitaryOrder[] = res.map(order => {
        return new MilitaryOrder(order.unit, order.amount, order.duration, order.eachDuration, order.endOrder);
      });
      this.militaryOrdersChanged.next(militaryOrders);
    });
  }
}
