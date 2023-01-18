import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {APP_BASE_URL} from "../app.service";
import {AttendanceWorkReportModel} from "../models/attendance-work-report.model";

@Injectable({
  providedIn: 'root'
})
export class AttendanceWorkReportService {

  private attendanceWorkUrl = APP_BASE_URL + '/api/attendance-works';

  constructor(private http: HttpClient) {
  }

  public getUserSavedAttendanceWorkReportForToday(userId: number) {
    return this.http.get<AttendanceWorkReportModel>(`${this.attendanceWorkUrl}/today/user/${userId}`);
  }

  public saveAttendanceWorkReport(model: AttendanceWorkReportModel) {
    return this.http.post<AttendanceWorkReportModel>(`${this.attendanceWorkUrl}`, model);
  }

  public updateAttendanceWorkReport(model: AttendanceWorkReportModel) {
    return this.http.put<AttendanceWorkReportModel>(`${this.attendanceWorkUrl}`, model);
  }

}
