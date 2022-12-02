import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signUpForm = new UntypedFormGroup({
    'email': new UntypedFormControl('', {validators: [Validators.required]}),
    'username': new UntypedFormControl('', {validators: [Validators.required]}),
    'password': new UntypedFormControl('', {validators: [Validators.required]})
  });
  componentSubs: Subscription[] = [];
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.isLoading = true;
    this.authService.registerUser({
      email: this.signUpForm?.value.email,
      username: this.signUpForm?.value.username,
      password: this.signUpForm?.value.password
    });
  }

  ngOnInit() {
    this.componentSubs.push(this.authService.isLoadingChanged.subscribe(result => {
      this.isLoading = result;
    }));
  }

  onLogin() {
    this.router.navigate(['/welcome-page','login']);
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}

