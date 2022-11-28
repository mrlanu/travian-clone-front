import {Component, OnDestroy, OnInit} from '@angular/core';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp, faHome} from '@fortawesome/free-solid-svg-icons';
import {VillageService} from "../../services/village.service";
import {MapTile, VillageView} from "../../models/village-dto.model";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {TileDetailComponent} from "./tile-detail/tile-detail.component";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {settlementSelector} from "../store/settlement.selectors";

export class TileDetail{
  constructor(public id: string, public type: string, public subType: string, public nation: string, public playerName: string,
              public name: string, public x: number, public y: number, public population: number, public distance: number) {
  }
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

export interface MapPart {
  fromX: number;
  toX: number;
  fromY: number;
  toY: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  bsModalRef?: BsModalRef;

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faHome = faHome;

  faStyle = {
    'color': 'white'
  }

  villageId?: string;
  villageCoordinates: { x: number, y: number} = {x: 0, y: 0};
  currentMapPointer: { x: number, y: number} = {x: 0, y: 0};

  tiles: MapTile[] = [];
  xAxis: MapTile[] = []
  yAxis: MapTile[] = [];

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private modalService: BsModalService, private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {
      this.store.select(settlementSelector).pipe(take(1)).subscribe(
        village => {
          if (village){
            this.villageId = village.villageId;
            this.villageCoordinates = {x: village.x, y: village.y};
            this.currentMapPointer = {x: village.x, y: village.y};
            this.villageService.getPartOfMap(MapComponent.castCoordinates(this.currentMapPointer.x, this.currentMapPointer.y));
          }
        });
    this.componentSubs.push(
      this.villageService.partOfWorldChanged.subscribe(list => {
        this.tiles = list;
        this.xAxis = list.slice(0, 10);
        this.yAxis = [list[0], list[10], list[20], list[30], list[40], list[50], list[60]];
      }));
  }

  onTileSelected(id: string){
    this.villageService.getTileDetail(id, this.villageCoordinates.x, this.villageCoordinates.y).subscribe(detail => {
      console.log('Tile detail - ', detail);
      this.openModalWithComponent(detail);
    });
  }

  openModalWithComponent(tileDetail: TileDetail) {
    const initialState: ModalOptions = {
      initialState: {
        villageId: this.villageId,
        title: 'Confirm sending ',
        tileDetail: tileDetail,
        /*position: this.route.snapshot.params['position']*/
      }
    };
    this.bsModalRef = this.modalService.show(TileDetailComponent, initialState);
    this.bsModalRef.onHide?.pipe(take(1)).subscribe((reason: string | any) => {
      if (reason === 'confirm'){
        //this.confirmSending(militaryUnitContract);
      }
      if (reason === 'cancel'){
        //this.cancelSending();
      }
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  onLeft(){
    this.currentMapPointer.x--;
    this.villageService.getPartOfMap(MapComponent.castCoordinates(this.currentMapPointer.x, this.currentMapPointer.y));
  }

  onRight(){
    this.currentMapPointer.x++;
    this.villageService.getPartOfMap(MapComponent.castCoordinates(this.currentMapPointer.x, this.currentMapPointer.y));
  }

  onUp(){
    this.currentMapPointer.y--;
    this.villageService.getPartOfMap(MapComponent.castCoordinates(this.currentMapPointer.x, this.currentMapPointer.y));
  }

  onDown(){
    this.currentMapPointer.y++;
    this.villageService.getPartOfMap(MapComponent.castCoordinates(this.currentMapPointer.x, this.currentMapPointer.y));
  }

  onCenter(){
    this.villageService.getPartOfMap(MapComponent.castCoordinates(this.villageCoordinates.x, this.villageCoordinates.y));
    this.currentMapPointer = {x: this.villageCoordinates.x, y: this.villageCoordinates.y};
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private static castCoordinates(x: number, y: number): MapPart{
    let fromX = x - 5;
    let toX = x + 6;
    let fromY = y - 4;
    let toY = y + 4;
    if (x - 5 < 0){
      fromX = 0;
      toX = 11;
    }
    if (x + 6 > 50){
      fromX = 40;
      toX = 51;
    }
    if (y - 4 < 0){
      fromY = 0;
      toY = 8;
    }
    if (y + 4 > 50){
      fromY = 43;
      toY = 51;
    }
    return {fromX: fromX, toX: toX, fromY: fromY, toY: toY}
  }

}
