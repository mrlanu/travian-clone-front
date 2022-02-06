import {Component, OnDestroy, OnInit} from '@angular/core';
import { faArrowUp, faArrowDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {VillageService} from "../../services/village.service";
import {MapPart, MapTile, VillageView} from "../../models/village-dto.model";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  faStyle = {
    'color': 'white'
  }

  currentPart = new MapPart(10, 21, 10, 18);

  tiles: MapTile[] = [];
  xAxis: MapTile[] = []
  yAxis: MapTile[] = [];

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService) { }

  ngOnInit(): void {
      this.villageService.currentVillage.pipe(take(1)).subscribe(
        (village: VillageView | null) => {
          if (village){
            let fromX = village.x - 5;
            let toX = village.x + 6;
            if (village.x - 5 < 0){
              fromX = 0;
              toX = 11;
            }
            if (village.x + 6 > 50){
              fromX = 39;
              toX = 50;
            }
            let fromY = village.y - 4;
            let toY = village.y + 4;
            if (village.y - 4 < 0){
              fromY = 0;
              toY = 8;
            }
            if (village.y + 4 > 50){
              fromY = 42;
              toY = 50;
            }

            this.currentPart = new MapPart(fromX, toX, fromY, toY);
            this.villageService.getPartOfMap(this.currentPart);
          }
        });
    this.componentSubs.push(
      this.villageService.partOfWorldChanged.subscribe(list => {
        this.tiles = list;
        this.xAxis = list.slice(0, 10);
        this.yAxis = [list[0], list[10], list[20], list[30], list[40], list[50], list[60]];
      }));
  }

  onLeft(){
    if (this.currentPart.fromX > -1){
      this.currentPart.fromX--;
      this.currentPart.toX--;
    }
    this.villageService.getPartOfMap(this.currentPart);
  }

  onRight(){
    if (this.currentPart.toX < 51){
      this.currentPart.fromX++;
      this.currentPart.toX++;
    }
    this.villageService.getPartOfMap(this.currentPart);
  }

  onUp(){
    if (this.currentPart.fromY > -1){
      this.currentPart.fromY--;
      this.currentPart.toY--;
    }
    this.villageService.getPartOfMap(this.currentPart);
  }

  onDown(){
    if (this.currentPart.toY < 51){
      this.currentPart.fromY++;
      this.currentPart.toY++;
    }
    this.villageService.getPartOfMap(this.currentPart);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
