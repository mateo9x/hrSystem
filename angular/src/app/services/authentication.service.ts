import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {APP_BASE_URL} from "../app.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  public signinUser(authenticationRequest: AuthenticationRequest) {
    return this.http.post<any>(`${APP_BASE_URL}/authenticate`, authenticationRequest);
  }

  public logoutUser() {
    return this.http.post<any>(APP_BASE_URL + '/logout-user', {});
  }

}

export class AuthenticationRequest {
  email: string;
  password: string;
  rememberMe = false;
}
