import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
    http.head(APP_BASE_URL, { responseType: 'text' });
  }

}

export const APP_BASE_URL = 'http://localhost:8080';
