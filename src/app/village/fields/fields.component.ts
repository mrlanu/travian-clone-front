import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {EUnits, FieldView, VillageView} from "../../models/village-dto.model";
import { faHome } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit, OnDestroy {

  @Output() buildClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  villageId: string = '618016eefac3034ad72ace94';
  selectedField: FieldView | undefined;

  village: VillageView =  {
    accountId: "",
    buildings: [],
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

  faHome = faHome;

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService) { }

  ngOnInit(): void {
    this.componentSubs.push(
      this.villageService.villageChanged.subscribe(
        (village: VillageView) => {
          this.village = village;
          console.log('Fields component - ', this.village);
        }));
    this.villageService.getVillageById(this.villageId);
  }

  onBuildingsClick(){
    this.buildClick.next(true);
  }

  onFieldClick(villageId: string, field: FieldView) {
    let res = new Map<string, number>();
    for(const [key, value] of Object.entries(field.resourcesToNextLevel)){
      res.set(key, value);
    }
    field.resourcesToNextLevel = res;
    this.selectedField = field;
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
