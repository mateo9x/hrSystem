import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import {APP_BASE_URL} from "../../app.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = APP_BASE_URL + '/api/users';
  private mailSenderUrl = APP_BASE_URL + '/api/mail';

  constructor(private http: HttpClient) { }

  public findUser(id: any) {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  public saveUser(user: User) {
    return this.http.post<User>(`${this.userUrl}`, user);
  }

  public updateUserPassword(user: User) {
    return this.http.put<boolean>(`${this.userUrl}/password`, user);
  }

  public updateUserPasswordByToken(user: User) {
    return this.http.put<boolean>(`${this.userUrl}/password/token`, user);
  }

  public signinUser(user: any) {
    return this.http.post<any>(`${APP_BASE_URL}/authenticate`, user);
  }

  public isUserLogged() {
    return this.http.get<User>(`${APP_BASE_URL}/is-user-logged`);
  }

  public getUserLogged(): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/logged`);
  }

  public newUserWelcomeMail(user: User) {
    return this.http.post<User>(`${this.mailSenderUrl}/new-user-welcome-email`, user);
  }

  public resetPassword(mail: String) {
    return this.http.get<any>(`${this.userUrl}/resetPassword/${mail}`);
  }

  public getByUserToken(user: User) {
    return this.http.post<User>(`${this.userUrl}/token-user`, user);
  }

}
