import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventView, VillageView} from "../../models/village-dto.model";
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {

  events: EventView[] = [];
  componentSubs: Subscription[] = [];
  faTimes = faTimes;
  village: VillageView | undefined;

  constructor(private villageService: VillageService) { }

  onEventDelete(id: string){
    console.log('Event deleted: ', id)
  }

  ngOnInit(): void {
    this.componentSubs.push(this.villageService.villageChanged
      .subscribe((v: VillageView) => {
        this.village = v;
        this.events = v.eventsList;
      }));
  }

  ngOnDestroy() {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onCountDone() {
    this.villageService.getVillageById(this.village?.villageId!);
  }
}
