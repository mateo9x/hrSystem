import {Component, OnInit} from "@angular/core";
import {SnackBarService} from "../../../services/material/snackbar.service";
import {User} from "../../../models/user.model";
import {DateService} from "../../../services/date.service";
import previousMonday from "date-fns/previousMonday";
import {isMonday, isSunday, nextSunday} from "date-fns";
import {CookieService} from "ngx-cookie-service";
import {AttendanceWorkReportService} from "../../../services/attendance-work-report.service";
import {AttendanceWorkReportModel} from "../../../models/attendance-work-report.model";

@Component({
  selector: 'attendance-work-week',
  templateUrl: './attendance-work-week.component.html',
  styleUrls: ['./attendance-work-week.component.scss']
})
export class AttendanceWorkWeekComponent implements OnInit {
  columns = ['Dzień', 'Data', 'Status'];
  tableData: any[] = [];
  user: User;
  dateFrom: Date;
  dateTo: Date;
  attendancesForSelectedWeek: AttendanceWorkReportModel[] = [];

  constructor(private cookieService: CookieService, private attendanceWorkReportService: AttendanceWorkReportService,
              private snackBarService: SnackBarService, private dateService: DateService) {
  }

  ngOnInit() {
    this.setStartDates();
    this.getUserFromCookie();
    this.getAttendanceWorkForSelectedWeek();
  }

  setStartDates() {
    const todayDate = new Date();
    this.dateFrom = isMonday(todayDate) ? todayDate : previousMonday(todayDate);
    this.dateTo = isSunday(todayDate) ? todayDate : nextSunday(todayDate);
  }

  getUserFromCookie() {
    this.user = JSON.parse(this.cookieService.get('user'));
  }

  prepareTable() {
    this.tableData = [];
    let date = new Date(this.dateFrom);
    for (let i = date.getDay(); i <= 7; i++) {
      const dateFormatted = this.dateService.convertDateToJavaLocalDate(date);
      this.tableData.push({
        label: this.dateService.getDayName(date, 'pl-PL'),
        value: {day: dateFormatted, attendance: this.getAttendanceForDay(dateFormatted)}
      });
      date = new Date(date.setDate(date.getDate() + 1));
    }
  }

  getAttendanceWorkForSelectedWeek() {
    this.attendanceWorkReportService.getUserSavedAttendanceWorkReportBetweenDates(this.user.id, this.dateService.convertDateToJavaLocalDate(this.dateFrom), this.dateService.convertDateToJavaLocalDate(this.dateTo)).subscribe({
      next: (attendances) => {
        this.attendancesForSelectedWeek = attendances;
        this.prepareTable();
      },
      error: () => {
        this.attendancesForSelectedWeek = [];
      }
    });
  }

  getAttendanceForDay(date: string): string {
    const attendanceExists = this.attendancesForSelectedWeek.find((attendance => attendance.date.toString() === date));
    return attendanceExists ? 'Obecność potwierdzona, typ obecności: ' + this.getLabelForTypeOfWork(attendanceExists) : 'Obecność nie potwierdzona';
  }

  getLabelForTypeOfWork(attendance: AttendanceWorkReportModel) {
    return attendance.remoteWork ? 'Praca zdalna' : 'Praca w biurze';
  }

  previousWeek() {
    this.dateFrom = new Date(this.dateFrom.setDate(this.dateFrom.getDate() - 7));
    this.dateTo = new Date(this.dateTo.setDate(this.dateTo.getDate() - 7));
    this.getAttendanceWorkForSelectedWeek();
  }

  nextWeek() {
    this.dateFrom = new Date(this.dateFrom.setDate(this.dateFrom.getDate() + 7));
    this.dateTo = new Date(this.dateTo.setDate(this.dateTo.getDate() + 7));
    this.getAttendanceWorkForSelectedWeek();
  }

}
