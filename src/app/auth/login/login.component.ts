import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {UiService} from '../../services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = new FormGroup({
    email: new FormControl('wer@yahoo.com',
      {validators: [Validators.required]}),
    password: new FormControl('12345',
      {validators: [Validators.required]})
  });
  isLoading = false;
  componentSubs: Subscription[] = [];

  constructor(private authService: AuthService, private uiService: UiService) { }

  ngOnInit() {
    this.componentSubs.push(this.uiService.isLoadingChanged
      .subscribe(result => {
        this.isLoading = result;
      }));
  }

  onRegister() {
    this.uiService.isLoginChanged.next(false);
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
