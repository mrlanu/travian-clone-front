import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {UserInfo} from './user-info.model';
import {UiService} from '../services/ui.service';
import {AuthData} from "./auth-data.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  userChange = new Subject<UserInfo>();
  private isAuthenticated = false;
  loggedUser: UserInfo | undefined;

  constructor(private router: Router,
              private httpClient: HttpClient,
              private uiService: UiService) {}

  static saveToken(token: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user-id', userId);
    console.log('Obtained Access token - ', token);
  }

  registerUser(authData: AuthData) {
    this.httpClient.post(this.baseUrl + '/api/auth/signup', authData).subscribe(user => {
      console.log('User - ', user);
      this.uiService.isLoadingChanged.next(false);
      // this.uiService.openSnackBar('Register successfully, please Login', null, 5000);
      this.uiService.isLoginChanged.next(true);
    }, err => {
      // this.uiService.openSnackBar(err.error.message, null, 5000);
      this.uiService.isLoadingChanged.next(false);
    });
  }

  getToken(authData: AuthData) {
    this.httpClient.post(this.baseUrl + '/api/auth/login', authData, {observe: 'response'})
      .subscribe(response => {
        console.log('Success');
        const token = response.headers.get('token')!;
        const userId = response.headers.get('user-id')!;
        AuthService.saveToken(token, userId);
        this.authSuccessfully();
      }, err => {
        //this.uiService.openSnackBar('Invalid username or password', null, 5000);
        console.log('Error');
        this.uiService.isLoadingChanged.next(false);
      });
  }

  login(authData: AuthData) {
    this.getToken(authData);
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.clear();
    this.router.navigate(['/welcome-page']);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  authSuccessfully() {
    this.uiService.isLoadingChanged.next(false);
    this.isAuthenticated = true;

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));

    this.httpClient.get<string[]>(this.baseUrl + '/api/users/' + localStorage.getItem('user-id') + '/villages',
      {headers: headers})
      .subscribe(villageList => {
        console.log('Response - ', villageList);
        console.log('List - ', villageList);
        this.router.navigate(['/villages', villageList[0], 'fields']);
    });
  }


  getLoggedInUser() {
    this.httpClient.get<UserInfo>(this.baseUrl + '/user')
      .subscribe((user) => {
        this.loggedUser = user;
        environment.loggedUser = user;
      this.userChange.next(user);
    });
  }
}
