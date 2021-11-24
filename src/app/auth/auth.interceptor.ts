import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UiService} from "../services/ui.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router, private uiService: UiService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // requesting signup or login
    if (!this.authService.currentUser) {
      return next.handle(req);
    } else if (!this.authService.currentUser?.token) { // token expired
      this.authService.logout();
      this.router.navigate(['/welcome-page', 'login']);
      this.uiService.showSnackbar('Token expired', null, 4000);
      return EMPTY;
    }

    const newReq = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + this.authService.currentUser?.token)
    });

    return next.handle(newReq);
  }
}
