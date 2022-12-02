import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {VillageService} from "../../services/village.service";
import {VillageView} from "../../models/village-dto.model";
import {faBalanceScale, faCrosshairs, faEdit, faHorseHead, faTools} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../auth/auth.service";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {settlementSelector} from "../store/settlement.selectors";
import {updateName} from "../store/settlement.actions";


@Component({
  selector: 'app-active-village',
  templateUrl: './active-village.component.html',
  styleUrls: ['./active-village.component.css']
})
export class ActiveVillageComponent implements OnInit {

  village: VillageView | undefined;
  componentSubs: Subscription[] = [];
  activeUsername: string | undefined = '';
  ngTest = 'Serhiy';

  faBalanceScale = faBalanceScale;
  faHorseHead = faHorseHead;
  faCrosshairs = faCrosshairs;
  faTools = faTools;
  faEdit = faEdit;

  faStyle = {
    'color': 'black'
  }

  constructor(private villageService: VillageService, private auth: AuthService, private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {
    this.componentSubs.push(
      this.store.select(settlementSelector).subscribe(
        village => {
          if (village){
            this.village = village;
            this.ngTest = village!.name;
            this.activeUsername = this.auth.currentUser?.username;
          }
        }));
  }

  onEditName(){
    this.store.dispatch(updateName({newName: this.ngTest}));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
