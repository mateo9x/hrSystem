import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import {Observable} from "rxjs/internal/Observable";
import {ProfilePasswordRequest} from "../../components/user/profile/password/profile-password.component";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private userUrl = environment.appBaseUrl + '/api/users';

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

  public updateUserPasswordByTokenProcedure(data: any) {
    return this.http.put<boolean>(`${this.userUrl}/password/token`, data);
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
