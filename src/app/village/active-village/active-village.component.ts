import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {VillageView} from "../../models/village-dto.model";
import {faBalanceScale, faHorseHead, faCrosshairs, faTools, faEdit} from "@fortawesome/free-solid-svg-icons";
import {User} from "../../auth/user.model";


@Component({
  selector: 'app-active-village',
  templateUrl: './active-village.component.html',
  styleUrls: ['./active-village.component.css']
})
export class ActiveVillageComponent implements OnInit {

  village: VillageView | undefined;
  componentSubs: Subscription[] = [];
  activeUsername = '';
  ngTest = 'Serhiy';

  faBalanceScale = faBalanceScale;
  faHorseHead = faHorseHead;
  faCrosshairs = faCrosshairs;
  faTools = faTools;
  faEdit = faEdit;

  faStyle = {
    'color': 'black'
  }

  constructor(private villageService: VillageService) { }

  ngOnInit(): void {
    this.componentSubs.push(
      this.villageService.villageChanged.subscribe(
        (village: VillageView) => {
          this.village = village;
          this.ngTest = village.name;
        }));
  }

  onEditName(){
    this.componentSubs.push(this.villageService.updateVillageName(this.ngTest)
      .subscribe(name => {
      this.ngTest = name;
    }));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
