import {Component, OnInit} from "@angular/core";
import {SnackBarService, SnackBarType} from "../../../services/material/snackbar.service";
import {User} from "../../../models/user.model";
import {DateService} from "../../../services/date.service";
import previousMonday from "date-fns/previousMonday";
import {isMonday, isSunday, nextSunday} from "date-fns";
import {CookieService} from "ngx-cookie-service";
import {AttendanceWorkService} from "../../../services/attendance-work.service";
import {AttendanceWorkDay, AttendanceWorkReportModel} from "../../../models/attendance-work-report.model";
import {MatDialog} from "@angular/material/dialog";
import {AttendanceWorkWeekDialogComponent} from "./dialog/attendance-work-week-dialog.component";

@Component({
  selector: 'attendance-work-week',
  templateUrl: './attendance-work-week.component.html',
  styleUrls: ['./attendance-work-week.component.scss']
})
export class AttendanceWorkWeekComponent implements OnInit {
  tableData: any[] = [];
  user: User;
  dateFrom: Date;
  dateTo: Date;
  attendanceWorkReportsForSelectedWeek: AttendanceWorkReportModel[] = [];
  attendanceWorkDaysForSelectedWeek: AttendanceWorkDay[] = [];

  constructor(private cookieService: CookieService, private attendanceWorkReportService: AttendanceWorkService,
              private snackBarService: SnackBarService, private dateService: DateService,
              private dialog: MatDialog) {
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

  getAttendanceWorkForSelectedWeek() {
    this.attendanceWorkReportService.getUserSavedAttendanceWorkReportBetweenDates(this.user.id, this.dateService.convertDateToJavaLocalDate(this.dateFrom), this.dateService.convertDateToJavaLocalDate(this.dateTo)).subscribe({
      next: (attendanceWorkReports) => {
        this.attendanceWorkReportsForSelectedWeek = attendanceWorkReports;
        this.getAttendanceWorkDaysForSelectedWeek();
      },
      error: () => {
        this.tableData = [];
        this.attendanceWorkReportsForSelectedWeek = [];
        this.attendanceWorkDaysForSelectedWeek = [];
      }
    });
  }

  getAttendanceWorkDaysForSelectedWeek() {
    this.attendanceWorkReportService.getAllAttendanceWorkDaysForUserBetweenSelectedDates(this.user.id, this.dateService.convertDateToJavaLocalDate(this.dateFrom), this.dateService.convertDateToJavaLocalDate(this.dateTo)).subscribe({
      next: (attendanceWorkDays) => {
        this.attendanceWorkDaysForSelectedWeek = attendanceWorkDays;
        this.prepareTable();
      },
      error: () => {
        this.tableData = [];
        this.attendanceWorkReportsForSelectedWeek = [];
        this.attendanceWorkDaysForSelectedWeek = [];
      }
    });
  }

  prepareTable() {
    this.tableData = [];
    let date = new Date(this.dateFrom);
    for (let i = date.getDay() - 1; i <= 6; i++) {
      const dateFormatted = this.dateService.convertDateToJavaLocalDate(date);
      const attendances = this.getAttendancesForDay(dateFormatted);
      this.tableData.push({
        label: this.dateService.getDayName(date, 'pl-PL'),
        day: dateFormatted,
        hours: this.sumAllHoursFromAttendances(attendances),
        attendances: attendances
      });
      date = new Date(date.setDate(date.getDate() + 1));
    }
  }

  getAttendancesForDay(date: string) {
    let returnList = [];
    const attendanceWorkReportExists = this.attendanceWorkReportsForSelectedWeek.find((attendance => attendance.date.toString() === date));
    if (attendanceWorkReportExists) {
      const attendanceWorkDaysExists = this.attendanceWorkDaysForSelectedWeek.filter(attendanceWorkDay => attendanceWorkDay.attendanceWorkReport.id === attendanceWorkReportExists.id);
      if (attendanceWorkDaysExists) {
        returnList = attendanceWorkDaysExists;
      }
    }
    return returnList;
  }

  sumAllHoursFromAttendances(attendances: AttendanceWorkDay[]) {
    let totalHours = 0;
    attendances.map(attendance => attendance.hours).forEach(hour => {
      totalHours += hour;
    });
    return totalHours;
  }

  openNewWorkDayDialog(day: string) {
    let dialogRef = this.dialog.open(AttendanceWorkWeekDialogComponent, {
      data: Object.assign({}, new AttendanceWorkDay(this.getAttendanceWorkReportByDay(day)))
    });
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        if (response) {
          this.attendanceWorkReportService.saveAttendanceWorkDayForUser(response.data).subscribe({
            next: () => {
              this.snackBarService.openSnackBar('Pomyślnie dodano raport czasu pracy dla dnia: ' + day, SnackBarType.SUCCESS);
              this.getAttendanceWorkForSelectedWeek();
            },
            error: () => {
              this.snackBarService.openSnackBar('Nie udało dodać się raportu czasu pracy dla dnia: ' + day, SnackBarType.ERROR);
            }
          });
        }
      }
    });
  }

  openEditWorkDayDialog(attendance: AttendanceWorkDay) {
    let dialogRef = this.dialog.open(AttendanceWorkWeekDialogComponent, {
      data: Object.assign({}, attendance)
    });
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        if (response && !response.delete) {
          this.attendanceWorkReportService.updateAttendanceWorkDayForUser(response.data).subscribe({
            next: (updatedAttendanceWorkDay) => {
              this.snackBarService.openSnackBar('Pomyślnie zaaktualizowano raport czasu pracy dla dnia: ' + updatedAttendanceWorkDay.attendanceWorkReport.date, SnackBarType.SUCCESS);
              this.getAttendanceWorkForSelectedWeek();
            },
            error: () => {
              this.snackBarService.openSnackBar('Nie udało zaaktualizować się raportu czasu pracy dla dnia: ' + response.data.attendanceWorkReport.date, SnackBarType.ERROR);
            }
          });
        } else if (response && response.delete) {
          const id = response.data;
          this.attendanceWorkReportService.deleteAttendanceWorkDayForUser(id).subscribe({
            next: () => {
              this.snackBarService.openSnackBar('Usunięto raport czasu pracy', SnackBarType.SUCCESS);
              this.getAttendanceWorkForSelectedWeek();
            },
            error: () => {
              this.snackBarService.openSnackBar('Nie udało usunąć się raportu czasu pracy', SnackBarType.ERROR);
            }
          });
        }
      }
    });
  }


  getAttendanceWorkReportByDay(day: string) {
    return this.attendanceWorkReportsForSelectedWeek.find((attendanceWorkReport => attendanceWorkReport.date.toString() === day));
  }

  doesAttendanceWorkReportExistsForDay(day: string) {
    const attendanceWorkReportExist = this.attendanceWorkReportsForSelectedWeek.find((attendanceWorkReport => attendanceWorkReport.date.toString() === day));
    return !!attendanceWorkReportExist;
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
