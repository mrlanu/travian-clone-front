import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UiService} from "../../services/ui.service";
import {Utils} from "../../shared/utils";

export interface BuildingView {
  position: number;
  level: number;
  name: string;
  production: number;
  underUpgrade: boolean;
  ableToUpgrade: boolean;
  maxLevel: number;
  description: string;
  timeToNextLevel: number;
  resourcesToNextLevel: Map<string, number>;
  capacity: number;
  timeReduction: number;
}

@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.css']
})
export class BuildingDetailsComponent implements OnInit {

  @Input() buildingView!: BuildingView;

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private route: ActivatedRoute,
              private router: Router, private uiService: UiService) { }

  ngOnInit(): void {

  }

  public formatTime(timeSeconds: number): string {
    return Utils.formatTime(timeSeconds);
  }

  onUpgradeClick(){
    let villageId = this.route.parent?.snapshot.params['village-id'];
    this.villageService.upgradeField(villageId, this.buildingView.position!).subscribe(resp => {
      this.router.navigate(['/villages', villageId, 'fields']);
    }, error => {
      this.uiService.showSnackbar('Error occurred', null, 4000);
      this.router.navigate(['/villages', villageId, 'fields']);
    });
  }

}
