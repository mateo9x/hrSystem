import { Injectable } from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  constructor(private datePipe: DatePipe) {
  }

  public convertDateToJavaLocalDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}
