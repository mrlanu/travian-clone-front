import {Component, Input, OnInit} from '@angular/core';
import {Building} from "../all-buildings-list.component";
import {Utils} from "../../../shared/utils";

@Component({
  selector: 'app-building-item',
  templateUrl: './building-item.component.html',
  styleUrls: ['./building-item.component.css']
})
export class BuildingItemComponent implements OnInit {

  @Input() building!: Building;

  constructor() { }

  ngOnInit(): void {
  }

  public formatTime(timeSeconds: number): string {
    return Utils.formatTime(timeSeconds);
  }

}
