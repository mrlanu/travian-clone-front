import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {UiService} from '../services/ui.service';
import {User} from "./user.model";
import {map, tap} from "rxjs/operators";
import {AuthRequest} from "./auth-request.model";

interface AuthResponse{
  email: string;
  token: string;
  expirationDate: Date;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  currentUser: User | null = null;
  private isAuthenticated = false;
  private tokenTimer: any;

  constructor(private router: Router,
              private httpClient: HttpClient,
              private uiService: UiService) {}

  registerUser(authData: AuthRequest) {
    this.uiService.isLoadingChanged.next(true);
    this.httpClient.post(this.baseUrl + '/api/auth/signup', authData).subscribe(user => {
      this.uiService.isLoadingChanged.next(false);
      this.router.navigate(['/welcome-page', 'login']);
    }, err => {
      this.uiService.isLoadingChanged.next(false);
    });
  }

  login(authData: AuthRequest) {
    this.uiService.isLoadingChanged.next(true);
    this.httpClient.post<AuthResponse>(this.baseUrl + '/api/auth/login', authData)
      .pipe(map(res => {
        console.log('Res - ', res);
      return  new User(res.token, new Date(res.expirationDate), res.email, res.userId);
    })).subscribe(user => {
        AuthService.storeUser(user);
        this.authSuccessfully(user);
      }, err => {
        //this.uiService.openSnackBar('Invalid username or password', null, 5000);
        console.log('Error');
        this.uiService.isLoadingChanged.next(false);
      });
  }

  autoLogin(){
    const userData: {
      email: string;
      _token: string;
      expirationDate: string;
      userId: string
    } = JSON.parse(<string>localStorage.getItem('user'));
    if (!userData){
      return;
    }
    const user = new User(userData._token, new Date(userData.expirationDate), userData.email, userData.userId);

    if (user.token){
      this.authSuccessfully(user);
    }
  }

  private authSuccessfully(user: User) {
    this.uiService.isLoadingChanged.next(false);
    this.isAuthenticated = true;
    this.currentUser = user;
    this.autoLogout(user.expirationDate.getTime() - new Date().getTime());
    this.httpClient.get<string[]>(this.baseUrl + '/api/users/' + user.userId + '/villages')
      .subscribe(villageList => {
        this.router.navigate(['/villages', villageList[0], 'fields']);
      });
  }

  private static storeUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.isAuthenticated = false;
    this.currentUser = null;
    localStorage.clear();
    if (this.tokenTimer){
      clearTimeout(this.tokenTimer);
    }
    this.tokenTimer = null;
    this.router.navigate(['/welcome-page', 'login']);
  }

  autoLogout(expirationDuration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
