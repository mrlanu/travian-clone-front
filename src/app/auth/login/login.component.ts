import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {Router} from "@angular/router";
import {User} from "../user.model";
import {VillageService} from "../../services/village.service";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  user: User | undefined;
  loginForm = new FormGroup({
    email: new FormControl('wer@yahoo.com',
      {validators: [Validators.required]}),
    password: new FormControl('12345',
      {validators: [Validators.required]})
  });
  isLoading = false;
  componentSubs: Subscription[] = [];

  constructor(private authService: AuthService, private router: Router, private villageService: VillageService) { }

  ngOnInit() {
    this.componentSubs.push(this.authService.isLoadingChanged
      .subscribe(result => {
        this.isLoading = result;
      }));
    this.componentSubs.push(this.villageService.villagesList
      .pipe(filter(l => l.length != 0)) // because used BehaviorSubject firs value is []
      .subscribe(list => {
        this.router.navigate(['/villages', list[0].villageId, 'fields']);
      }));
    this.componentSubs.push(this.authService.userChanged
      .subscribe(user => {
        this.villageService.getAllVillagesByUser(user.userId);
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
    console.log('Destroy');
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }


}
