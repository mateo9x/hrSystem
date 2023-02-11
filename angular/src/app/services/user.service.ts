import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {APP_BASE_URL} from "../app.service";
import {Observable} from "rxjs/internal/Observable";
import {ProfilePasswordRequest} from "../components/user/profile/password/profile-password.component";

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

  public updateUser(user: User) {
    return this.http.put<User>(`${this.userUrl}/update-user`, user);
  }

  public updateUserPassword(request: ProfilePasswordRequest) {
    return this.http.put<boolean>(`${this.userUrl}/password`, request);
  }

  public updateUserPasswordByToken(user: User) {
    return this.http.put<boolean>(`${this.userUrl}/password/token`, user);
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

  public getAllUsers() {
    return this.http.get<User[]>(`${this.userUrl}`);
  }

  public deleteUser(id: number) {
    return this.http.delete<boolean>(`${this.userUrl}/${id}`);
  }

}
