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
    this.getActiveUser();
  }

  onEditName(){
    this.componentSubs.push(this.villageService.updateVillageName(this.ngTest).subscribe(name => {
      this.ngTest = name;
    }));
  }

  getActiveUser(){
    const userData: {
      email: string;
      username: string;
      _token: string;
      expirationDate: string;
      userId: string
    } = JSON.parse(<string>localStorage.getItem('user'));
    if (!userData){
      return;
    }
    const user = new User(userData._token, new Date(userData.expirationDate), userData.email, userData.username, userData.userId);
    this.activeUsername = user.username;
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
