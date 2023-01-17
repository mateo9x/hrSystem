import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {APP_BASE_URL} from "../app.service";
import {Role} from "../models/role.model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private roleUrl = APP_BASE_URL + '/api/roles';

  constructor(private http: HttpClient) { }

  public getAllRoles() {
    return this.http.get<Role[]>(`${this.roleUrl}`);
  }

}
