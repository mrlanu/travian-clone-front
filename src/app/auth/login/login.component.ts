import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {Router} from "@angular/router";
import {User} from "../user.model";
import {VillageService} from "../../services/village.service";
import {filter} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {fetchSettlement} from "../../village/store/settlement.actions";
import {settlementSelector} from "../../village/store/settlement.selectors";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  user: User | undefined;
  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('wer@yahoo.com',
      {validators: [Validators.required]}),
    password: new UntypedFormControl('12345',
      {validators: [Validators.required]})
  });
  isLoading = false;
  componentSubs: Subscription[] = [];

  constructor(private authService: AuthService, private router: Router, private villageService: VillageService,
              private store: Store<fromAppStore.AppState>) { }

  ngOnInit() {
    this.componentSubs.push(this.authService.isLoadingChanged
      .subscribe(result => {
        this.isLoading = result;
      }));
    this.componentSubs.push(this.store.select(settlementSelector).subscribe(village => {
      if (village){
        this.router.navigate(['/villages', village.villageId, 'fields']);
      }
    }));
    this.componentSubs.push(this.authService.userChanged
      .subscribe(user => {
        this.villageService.getAllVillagesByUser(user.userId).subscribe(list => {
          this.store.dispatch(fetchSettlement({id: list[0].villageId}));
        });
      }));
  }

  onRegister() {
    this.router.navigate(['/welcome-page','signup']);
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }


}
