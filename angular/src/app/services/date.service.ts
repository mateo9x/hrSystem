import {Injectable} from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private datePipe: DatePipe) {
  }

  public convertDateToJavaLocalDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  public calculateDiffrenceBetweenDatesInDays(dateFrom: Date, dateTo: Date) {
    this.zeroDate(dateFrom);
    this.zeroDate(dateTo);
    const dateToPlusOne = new Date(dateTo.setDate(dateTo.getDate() + 1));
    const diffrenceInTime = dateToPlusOne.getTime() - dateFrom.getTime();
    return Math.floor(diffrenceInTime / (1000 * 3600 * 24));
  }

  private zeroDate(date: Date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setMilliseconds(0);
  }

}
