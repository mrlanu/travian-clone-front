import {Component, Input, OnInit} from '@angular/core';
import {Building} from "../all-buildings-list.component";
import {Utils} from "../../../shared/utils";
import {ActivatedRoute, Router} from "@angular/router";
import {VillageService} from "../../../services/village.service";

@Component({
  selector: 'app-building-item',
  templateUrl: './building-item.component.html',
  styleUrls: ['./building-item.component.css']
})
export class BuildingItemComponent implements OnInit {

  @Input() building!: Building;

  constructor(private villageService: VillageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {}

  public formatTime(timeSeconds: number): string {
    return Utils.formatTime(timeSeconds);
  }

  onBuildingSelect(kind: string){
    const selectedPosition = this.route.snapshot.params['position'];
    const villageId = this.route.parent!.snapshot.params['village-id'];
    this.villageService.createNewBuilding(villageId, selectedPosition, kind).subscribe(res => {
      this.router.navigate(['/villages', villageId, 'buildings']);
    });
  }

}
