import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // requesting signup
    if (!this.authService.currentUser) {
      return next.handle(req);
    }

    const newReq = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + this.authService.currentUser?.token)
    });

    return next.handle(newReq);
  }
}
