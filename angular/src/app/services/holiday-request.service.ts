import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {APP_BASE_URL} from "../app.service";
import {HolidayRequest, HolidayRequestStatus, HolidayRequestType} from "../models/holiday-request.model";

@Injectable({
  providedIn: 'root'
})
export class HolidayRequestService {

  private holidayRequestTypeUrl = APP_BASE_URL + '/api/holiday-requests';

  constructor(private http: HttpClient) {
  }

  public getAllHolidayRequestTypes() {
    return this.http.get<HolidayRequestType[]>(`${this.holidayRequestTypeUrl}-types`);
  }

  public getAllHolidayRequestStatuses() {
    return this.http.get<HolidayRequestStatus[]>(`${this.holidayRequestTypeUrl}-statuses`);
  }

  public getAllHolidayRequestsForUserBetweenSelectedDates(userId: number, dateFrom: string, dateTo: string) {
    return this.http.get<HolidayRequest[]>(`${this.holidayRequestTypeUrl}/${userId}/${dateFrom}/${dateTo}`);
  }

  public saveHolidayRequest(holidayRequest: HolidayRequest) {
    return this.http.post<HolidayRequest>(`${this.holidayRequestTypeUrl}`, holidayRequest);
  }

  public updateHolidayRequest(holidayRequest: HolidayRequest) {
    return this.http.put<HolidayRequest>(`${this.holidayRequestTypeUrl}`, holidayRequest);
  }

  public deleteHolidayRequest(id: number) {
    return this.http.delete<boolean>(`${this.holidayRequestTypeUrl}/${id}`);
  }

}
