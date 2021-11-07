import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UiService} from '../services/ui.service';
/*import {UiService} from '../../shared/ui.service';*/

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  isLogin = false;
  isShowBudgetSelect = false;

  constructor(private uiService: UiService) { }

  ngOnInit() {
    this.componentSubs.push(this.uiService.isLoginChanged
      .subscribe(result => {
        this.isLogin = result;
      }));
    this.componentSubs.push(this.uiService.isShowBudgetSelectChanged
      .subscribe(result => {
        this.isShowBudgetSelect = result;
      }));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }
}
