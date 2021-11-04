import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {FieldView, VillageView} from "../../models/village-dto.model";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit, OnDestroy {

  @Output() buildClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  selectedField!: FieldView;

  village!: VillageView;
  faHome = faHome;

  componentSubs: Subscription[] = [];

  constructor(private villageService: VillageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.componentSubs.push(
      this.villageService.villageChanged.subscribe(
        (village: VillageView) => {
          this.village = village;
        }));
    this.villageService.getVillageById(this.route.parent?.snapshot.params['village-id']);
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
