import {Component, OnDestroy, OnInit} from '@angular/core';
import {VillageView} from "../../models/village-dto.model";
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UiService} from "../../services/ui.service";

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
export class BuildingDetailsComponent implements OnInit, OnDestroy {

  village!: VillageView;
  buildingView!: BuildingView;

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private route: ActivatedRoute,
              private router: Router, private uiService: UiService) { }

  ngOnInit(): void {
    this.componentSubs.push(
      this.villageService.villageChanged.subscribe(
        (village: VillageView) => {
          this.village = village;
          this.buildingView = village.buildings.find(f => {
            return f.position == +this.route.snapshot.params['position'];
          })!;
          let res = new Map<string, number>();
          for(const [key, value] of Object.entries(this.buildingView!.resourcesToNextLevel)){
            res.set(key, value);
          }
          this.buildingView!.resourcesToNextLevel = res;
        }));
    this.villageService.getVillageById(this.route.parent?.snapshot.params['village-id']);
  }

  public formatTime(timeSeconds: number): string {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(timeSeconds / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = timeSeconds % 60;
    let minutesStr = minutes.toString();
    let secondsStr = seconds.toString();
    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (minutes < 10) {
      minutesStr = `0${minutes}`;
    }
    if (seconds < 10) {
      secondsStr = `0${seconds}`;
    }

    // The output in MM:SS format
    return `00:${minutesStr}:${secondsStr}`;
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

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
