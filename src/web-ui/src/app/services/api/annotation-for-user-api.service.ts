import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AnnotationForUser} from "../../models/annotation-for-user.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnnotationForUserApiService {

  private attendanceWorkUrl = environment.appBaseUrl + '/api/annotations-for-users';

  constructor(private http: HttpClient) {
  }

  public saveAnnotationsForUsers(request: AnnotationForUserRequest) {
    return this.http.post<AnnotationForUser[]>(`${this.attendanceWorkUrl}`, request);
  }

  public getAnnotationsForUser(userId: number) {
    return this.http.get<AnnotationForUser[]>(`${this.attendanceWorkUrl}/${userId}`);
  }

  public updateAnnotationsReadedValues(id: number[]) {
    return this.http.put<boolean>(`${this.attendanceWorkUrl}/readed`, id);
  }

  public deleteAnnotationById(id: number) {
    return this.http.delete<boolean>(`${this.attendanceWorkUrl}/${id}`);
  }

}

export class AnnotationForUserRequest {
  userIds: number[];
  createDate: Date;
  message: string;
}
