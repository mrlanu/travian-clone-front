import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {EUnits, VillageView} from "../../models/village-dto.model";
import {CountdownConfig} from "ngx-countdown";

const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit, OnDestroy {

  villageId: string = '616f843aa237fb21e8488803';

  village: VillageView =  {
    accountId: "",
    buildings: "",
    culture: 0,
    eventsList: [],
    fields: [],
    homeLegion: new Map<EUnits, number>(),
    name: "",
    population: 0,
    producePerHour: new Map<string, number>(),
    storage: new Map<string, number>(),
    warehouseCapacity: 0,
    granaryCapacity: 0,
    villageId: "",
    villageType: "",
    x: 0,
    y: 0
  };

  componentSubs: Subscription[] = [];
  conf: CountdownConfig = {leftTime: 0};

  constructor(private villageService: VillageService) { }

  ngOnInit(): void {
    this.componentSubs.push(
      this.villageService.villageChanged.subscribe(
        (village: VillageView) => {
          console.log(village);
          this.village = village;
          const t = village.eventsList.reduce((a, b) => b.timeLeft, 0);
          if (this.village.eventsList.length > 0){
            this.conf = {
              leftTime: t + 2,
              formatDate: ({ date, formatStr }) => {
                let duration = Number(date || 0);

                return CountdownTimeUnits.reduce((current, [name, unit]) => {
                  if (current.indexOf(name) !== -1) {
                    const v = Math.floor(duration / unit);
                    duration -= v * unit;
                    return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
                      return v.toString().padStart(match.length, '0');
                    });
                  }
                  return current;
                }, formatStr);
              },
            };
          }
        }));
    this.villageService.getVillageById(this.villageId);
  }

  handleEvent(event: string) {
    if (event === 'done'){
      this.villageService.getVillageById(this.villageId);
    }
  }

  onFieldClick(villageId: string, fieldPosition: number) {
    this.villageService.upgradeField(villageId, fieldPosition);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
