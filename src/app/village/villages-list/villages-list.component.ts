import {Component, OnDestroy, OnInit} from '@angular/core';
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {ShortVillageInfo} from "../../models/village-dto.model";
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-villages-list',
  templateUrl: './villages-list.component.html',
  styleUrls: ['./villages-list.component.css']
})
export class VillagesListComponent implements OnInit, OnDestroy {

  villages: ShortVillageInfo[] = [];
  componentSubs: Subscription[] = [];

  faEye = faEye;

  faStyle = {
    'color': 'black'
  }

  currentVillageId = '';

  constructor(private villageService: VillageService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.componentSubs.push(
      this.villageService.villagesList.subscribe(list => {
        this.villages = list;
      }));
    this.route.params.subscribe(params => {
      this.currentVillageId = params['village-id'];
    });
  }

  onVillageSelect(villageId: string){
    const lastWord = this.router.url.split('/')[3];
    this.router.navigate(['/villages', villageId, lastWord]);
  }


  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}


