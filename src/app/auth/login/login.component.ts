import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {Router} from "@angular/router";
import {User} from "../user.model";
import {VillageService} from "../../services/village.service";
import {Store} from "@ngrx/store";
import * as fromAppStore from "../../store/app.reducer";
import {clear, fetchSettlement, fetchSettlementsList} from "../../village/store/settlement.actions";
import {settlementSelector, settlementsListSelector} from "../../village/store/settlement.selectors";

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

    //when user successfully logged in fetching all his settlements
    this.componentSubs.push(this.authService.userChanged
      .subscribe(user => {
        this.store.dispatch(clear());
        return this.store.dispatch(fetchSettlementsList({userId: user.userId}));
      })
    );

    //waiting for not empty list of those settlements
    this.componentSubs.push(this.store.select(settlementsListSelector).subscribe(list => {
      if (list.length > 0){
        //when that list of settlements arrived fetching the firs settlement from there
        this.store.dispatch(fetchSettlement({id: list[0].villageId}));
      }
    }));

    //waiting for that fetched settlement and then navigate to it
    this.componentSubs.push(this.store.select(settlementSelector).subscribe(village => {
      if (village){
        this.router.navigate(['/villages', village.villageId, 'fields']);
      }
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
