import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // requesting signup
    if (req.url.endsWith('signup')) {
      return next.handle(req);
    }

    // requesting any other resources
    if (req.headers.keys().length === 0) {
      const newReq = req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
      return next.handle(newReq);
    }

    // requesting login(/token/oauth)
    return next.handle(req);
  }
}
