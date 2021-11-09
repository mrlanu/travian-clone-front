import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private httpClient: HttpClient, private matSnackbar: MatSnackBar) {}

  baseUrl = environment.baseUrl;

  showSnackbar(message: string, action: any, duration: number){
    this.matSnackbar.open(message, action, {duration: duration});
  }

}
