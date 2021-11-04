import {Component, OnDestroy, OnInit} from '@angular/core';
import {FieldView, VillageView} from "../../models/village-dto.model";
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.css']
})
export class BuildingDetailsComponent implements OnInit, OnDestroy {

  village!: VillageView;
  field!: FieldView;

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.componentSubs.push(
      this.villageService.villageChanged.subscribe(
        (village: VillageView) => {
          this.village = village;
          this.field = village.fields.find(f => {
            return f.position == +this.route.snapshot.params['position'];
          })!;
          let res = new Map<string, number>();
          for(const [key, value] of Object.entries(this.field!.resourcesToNextLevel)){
            res.set(key, value);
          }
          this.field!.resourcesToNextLevel = res;
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
    this.villageService.upgradeField(villageId, this.field.position!);
    this.router.navigate(['/villages', villageId, 'fields']);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
