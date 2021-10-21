import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventView, VillageView} from "../../models/village-dto.model";
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {CountdownModel} from "../../models/countdown.model";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {

  events: EventView[] = [];
  componentSubs: Subscription[] = [];
  faTimes = faTimes;
  timeLeftList: CountdownModel[] = [];

  constructor(private villageService: VillageService) { }

  onEventDelete(id: string){
    console.log('Event deleted: ', id)
  }

  ngOnInit(): void {
    this.componentSubs.push(this.villageService.villageChanged
      .subscribe((v: VillageView) => {
        this.events = v.eventsList;
        if (this.events.length > 0){
          this.timeLeftList = [];
          this.events.forEach(e => {
            let countdown = new CountdownModel(e.timeLeft);
            this.timeLeftList.push(countdown);
            countdown.startTimer();
          });
        }
      }));
  }

  ngOnDestroy() {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
