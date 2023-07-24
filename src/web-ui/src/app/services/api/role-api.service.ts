import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Role} from "../../models/role.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleApiService {

  private roleUrl = environment.appBaseUrl + '/api/roles';

  constructor(private http: HttpClient) { }

  public getAllRoles() {
    return this.http.get<Role[]>(`${this.roleUrl}`);
  }

}
