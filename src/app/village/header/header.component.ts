import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  faBook,
  faChartLine,
  faEnvelope,
  faGlobe,
  faHome,
  faSeedling,
  faSignOutAlt,
  faSmileWink
} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../auth/auth.service";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {Subscription} from "rxjs";
import {settlementSelector} from "../store/settlement.selectors";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  newReportsCount = 0;
  componentSubs: Subscription[] = [];
  faSeedling = faSeedling;
  faHome = faHome;
  faGlobe = faGlobe;
  faChartLine = faChartLine;
  faBook = faBook;
  faEnvelope = faEnvelope;
  faSmileWink = faSmileWink;
  faSignOutAlt = faSignOutAlt;

  faStyle = {
    'color': 'darkgreen'
  };

  constructor(private authService: AuthService, private store: Store<fromAppStore.AppState>) { }

  ngOnInit(): void {
    this.componentSubs.push(this.store.select(settlementSelector).subscribe(settlement => {
      this.newReportsCount = settlement!.newReportsCount;
    }));
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }
}
