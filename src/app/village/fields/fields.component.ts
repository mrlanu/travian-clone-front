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
    this.componentSubs.push(this.route.parent!.params.subscribe((params) => {
      this.villageService.getVillageById(params['village-id']);
    }));
  }

  ngOnDestroy(): void {
    console.log('fields destroy');
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
