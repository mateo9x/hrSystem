import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {APP_BASE_URL} from "../app.service";
import {AnnotationForUser} from "../models/annotation-for-user.model";

@Injectable({
  providedIn: 'root'
})
export class AnnotationForUserService {

  private attendanceWorkUrl = APP_BASE_URL + '/api/annotations-for-users';

  constructor(private http: HttpClient) {
  }

  public saveAnnotationsForUser(request: AnnotationForUserRequest) {
    return this.http.post<AnnotationForUser[]>(`${this.attendanceWorkUrl}`, request);
  }
}

export class AnnotationForUserRequest {
  userIds: number[];
  createDate: Date;
  message: string;
}
