import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signUpForm = new FormGroup({
    'email': new FormControl('', {validators: [Validators.required]}),
    'password': new FormControl('', {validators: [Validators.required]})
  });
  componentSubs: Subscription[] = [];
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.isLoading = true;
    this.authService.registerUser({
      email: this.signUpForm?.value.email,
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

