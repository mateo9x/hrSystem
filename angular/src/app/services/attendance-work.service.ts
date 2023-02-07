import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {APP_BASE_URL} from "../app.service";
import {AttendanceWorkDay, AttendanceWorkReportModel, DicAttendanceWorkType} from "../models/attendance-work-report.model";

@Injectable({
  providedIn: 'root'
})
export class AttendanceWorkService {

  private attendanceWorkUrl = APP_BASE_URL + '/api/attendance-works';
  private dicAttendanceWorkUrl = APP_BASE_URL + '/api/dic-attendance-work-types';
  private attendanceWorkDaysUrl = APP_BASE_URL + '/api/attendance-work-days';

  constructor(private http: HttpClient) {
  }

  public getUserSavedAttendanceWorkReportForToday(userId: number) {
    return this.http.get<AttendanceWorkReportModel>(`${this.attendanceWorkUrl}/today/user/${userId}`);
  }

  public getUserSavedAttendanceWorkReportBetweenDates(userId: number, dateFrom: string, dateTo: string) {
    return this.http.get<AttendanceWorkReportModel[]>(`${this.attendanceWorkUrl}/user/${userId}/${dateFrom}/${dateTo}`);
  }

  public saveAttendanceWorkReport(model: AttendanceWorkReportModel) {
    return this.http.post<AttendanceWorkReportModel>(`${this.attendanceWorkUrl}`, model);
  }

  public updateAttendanceWorkReport(model: AttendanceWorkReportModel) {
    return this.http.put<AttendanceWorkReportModel>(`${this.attendanceWorkUrl}`, model);
  }

  public getAllDicAttendanceWorkTypes() {
    return this.http.get<DicAttendanceWorkType[]>(`${this.dicAttendanceWorkUrl}`);
  }

  public getAllAttendanceWorkDaysForUserBetweenSelectedDates(userId: number, dateFrom: string, dateTo: string) {
    return this.http.get<AttendanceWorkDay[]>(`${this.attendanceWorkDaysUrl}/${userId}/${dateFrom}/${dateTo}`);
  }

  public saveAttendanceWorkDayForUser(data: AttendanceWorkDay) {
    return this.http.post<AttendanceWorkDay>(`${this.attendanceWorkDaysUrl}`, data);
  }

  public updateAttendanceWorkDayForUser(data: AttendanceWorkDay) {
    return this.http.put<AttendanceWorkDay>(`${this.attendanceWorkDaysUrl}`, data);
  }

  public deleteAttendanceWorkDayForUser(id: number) {
    return this.http.delete<boolean>(`${this.attendanceWorkDaysUrl}/${id}`);
  }

}
