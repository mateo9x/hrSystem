import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {APP_BASE_URL} from "../app.service";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = APP_BASE_URL + '/api/users';

  constructor(private http: HttpClient) { }

  public findUser(id: any) {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  public createUser(user: User) {
    return this.http.post<User>(`${this.userUrl}/create-user`, user);
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

  public resetPassword(mail: String) {
    return this.http.get<any>(`${this.userUrl}/reset-password/${mail}`);
  }

  public getByUserToken(token: String) {
    return this.http.get<User>(`${this.userUrl}/token-user/${token}`);
  }

  public doesUserWithEmailExists(email: String): Observable<boolean> {
    return this.http.get<any>(`${this.userUrl}/email/exists/${email}`);
  }

  public getUserByEmail(email: String) {
    return this.http.get<User>(`${this.userUrl}/email/${email}`);
  }

}
