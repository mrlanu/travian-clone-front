import {Component, Input, OnInit} from '@angular/core';
import {VillageService} from "../../services/village.service";

interface FieldView {
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
}

@Component({
  selector: 'app-building-confirm',
  templateUrl: './building-confirm.component.html',
  styleUrls: ['./building-confirm.component.css']
})
export class BuildingConfirmComponent implements OnInit {

  @Input() field: FieldView | undefined;
  @Input() villageId: string | undefined;

  constructor(private villageService: VillageService) { }

  ngOnInit(): void {

  }

  onUpgradeClick() {
    this.villageService.upgradeField(this.villageId!, this.field?.position!);
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

}
