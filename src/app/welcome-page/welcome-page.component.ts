import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UiService} from '../services/ui.service';
import {AuthService} from "../auth/auth.service";
/*import {UiService} from '../../shared/ui.service';*/

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];

  constructor() { }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }
}
