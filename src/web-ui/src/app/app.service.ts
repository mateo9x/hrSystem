import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
    http.head(APP_BASE_URL, { responseType: 'text' });
  }

}

export const APP_BASE_URL = environment.appBaseUrl;
