import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HolidayRequest, HolidayRequestStatus, HolidayRequestType} from "../../models/holiday-request.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HolidayRequestApiService {

  private holidayRequestTypeUrl = environment.appBaseUrl + '/api/holiday-requests';

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

  public getAllHolidayRequestsBetweenSelectedDatesPending(dateFrom: string, dateTo: string) {
    return this.http.get<HolidayRequest[]>(`${this.holidayRequestTypeUrl}/${dateFrom}/${dateTo}`);
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
