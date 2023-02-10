import {Component, OnDestroy, OnInit} from "@angular/core";
import {SnackBarService, SnackBarType} from "../../../services/material/snackbar.service";
import {User} from "../../../models/user.model";
import {DateService} from "../../../services/date.service";
import previousMonday from "date-fns/previousMonday";
import {isMonday, isSunday, nextSunday} from "date-fns";
import {AttendanceWorkService} from "../../../services/attendance-work.service";
import {AttendanceWorkReportModel} from "../../../models/attendance-work-report.model";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AttendanceWorkReportEditFormService} from "./attendance-work-report-edit.form.service";
import {Subscription} from "rxjs";
import {AttendanceWorkReportEditDialogComponent} from "./dialog/attendance-work-report-edit-dialog.component";

@Component({
  selector: 'attendance-work-report-edit',
  templateUrl: './attendance-work-report-edit.component.html',
  styleUrls: ['./attendance-work-report-edit.component.scss']
})
export class AttendanceWorkReportEditComponent implements OnInit, OnDestroy {
  tableData = [];
  form: FormGroup;
  users: User[] = [];
  dateFrom: Date;
  dateTo: Date;
  attendanceWorkReportsForSelectedWeek: AttendanceWorkReportModel[] = [];
  selectedUserSubscription: Subscription

  constructor(private userService: UserService, private attendanceWorkReportService: AttendanceWorkService,
              private snackBarService: SnackBarService, private dateService: DateService,
              private dialog: MatDialog, private attendanceWorkReportEditFormService: AttendanceWorkReportEditFormService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.attendanceWorkReportEditFormService.getFormGroup(this.fb);
    this.setStartDates();
    this.prepareTable();
    this.getUsers();
    this.startUserFormSubscription();
  }

  ngOnDestroy() {
    this.selectedUserSubscription.unsubscribe();
  }

  setStartDates() {
    const todayDate = new Date();
    this.dateFrom = isMonday(todayDate) ? todayDate : previousMonday(todayDate);
    this.dateTo = isSunday(todayDate) ? todayDate : nextSunday(todayDate);
    this.dateFromForm.setValue(this.dateFrom);
    this.dateFromForm.disable();
    this.dateToForm.setValue(this.dateTo);
    this.dateToForm.disable();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: () => {
        this.users = [];
        this.snackBarService.openSnackBar('Nie udało wczytać się użytkowników', SnackBarType.ERROR);
      }
    });
  }

  prepareTable() {
    this.tableData = [];
    let date = new Date(this.dateFrom);
    for (let i = date.getDay() - 1; i <= 6; i++) {
      const dateFormatted = this.dateService.convertDateToJavaLocalDate(date);
      this.tableData.push({
        label: this.dateService.getDayName(date, 'pl-PL'),
        day: dateFormatted,
        attendanceWorkReport: this.getAttendanceWorkReportByDay(dateFormatted)
      });
      date = new Date(date.setDate(date.getDate() + 1));
    }
  }

  startUserFormSubscription() {
    this.selectedUserSubscription = this.selectedUser.valueChanges.subscribe({
      next: () => {
        if (this.selectedUser.value) {
          this.getAttendanceWorkForSelectedWeek();
        }
      }
    });
  }

  getAttendanceWorkForSelectedWeek() {
    const userId = this.attendanceWorkReportEditFormService.getUserIdValue(this.form);
    this.attendanceWorkReportService.getUserSavedAttendanceWorkReportBetweenDates(userId, this.dateService.convertDateToJavaLocalDate(this.dateFrom), this.dateService.convertDateToJavaLocalDate(this.dateTo)).subscribe({
      next: (attendanceWorkReports) => {
        this.attendanceWorkReportsForSelectedWeek = attendanceWorkReports;
        this.prepareTable();
      },
      error: () => {
        this.attendanceWorkReportsForSelectedWeek = [];
      }
    });
  }

  openWorkReportDialog(day: string) {
    let attendanceWorkReport = this.getAttendanceWorkReportByDay(day);
    if (!attendanceWorkReport) {
      attendanceWorkReport = new AttendanceWorkReportModel();
      attendanceWorkReport.date = day;
      attendanceWorkReport.userId = this.selectedUser.value;
    }

    let dialogRef = this.dialog.open(AttendanceWorkReportEditDialogComponent, {
      data: Object.assign({}, attendanceWorkReport)
    });
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        if (response && this.isDialogUpdate(response)) {
          this.updateAttendanceWorkReportForSelectedDateByUser(response.data);
        } else if (response && this.isDialogSave(response)) {
          this.saveNewAttendanceWorkReportForSelectedDateByUser(response.data);
        } else if (response && this.isDialogRemove(response)) {
          this.removeAttendanceWorkReportForSelectedDateByUser(response.data);
        }
      }
    });
  }

  saveNewAttendanceWorkReportForSelectedDateByUser(attendanceWorkReport: AttendanceWorkReportModel) {
    this.attendanceWorkReportService.saveAttendanceWorkReportForSelectedDateByUser(attendanceWorkReport).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('Pomyślnie dodano obecność dla użytkownika w dniu: ' + attendanceWorkReport.date, SnackBarType.SUCCESS);
        this.getAttendanceWorkForSelectedWeek();
      },
      error: () => {
        this.snackBarService.openSnackBar('Nie udało dodać się obecności dla użytkownika w dniu: ' + attendanceWorkReport.date, SnackBarType.ERROR);
      }
    });
  }

  updateAttendanceWorkReportForSelectedDateByUser(attendanceWorkReport: AttendanceWorkReportModel) {
    this.attendanceWorkReportService.updateAttendanceWorkReportForSelectedDateByUser(attendanceWorkReport).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('Pomyślnie zaaktualizowano obecność dla użytkownika w dniu: ' + attendanceWorkReport.date, SnackBarType.SUCCESS);
        this.getAttendanceWorkForSelectedWeek();
      },
      error: () => {
        this.snackBarService.openSnackBar('Nie udało zaaktualizować się obecności dla użytkownika w dniu: ' + attendanceWorkReport.date, SnackBarType.ERROR);
      }
    });
  }

  removeAttendanceWorkReportForSelectedDateByUser(attendanceWorkReport: AttendanceWorkReportModel) {
    this.attendanceWorkReportService.deleteAttendanceWorkReportByIdCascade(attendanceWorkReport.id).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('Pomyślnie usunięto obecność dla użytkownika w dniu: ' + attendanceWorkReport.date, SnackBarType.SUCCESS);
        this.getAttendanceWorkForSelectedWeek();
      },
      error: () => {
        this.snackBarService.openSnackBar('Nie udało usunąć się obecności dla użytkownika w dniu: ' + attendanceWorkReport.date, SnackBarType.ERROR);
      }
    });
  }

  isDialogSave(data: any) {
    return data.type === 'save';
  }

  isDialogUpdate(data: any) {
    return data.type === 'update';
  }

  isDialogRemove(data: any) {
    return data.type === 'remove';
  }

  getAttendanceWorkReportByDay(day: string) {
    return this.attendanceWorkReportsForSelectedWeek.find((attendanceWorkReport => attendanceWorkReport.date.toString() === day));
  }

  getAttendanceWorkReportStatus(attendanceWorkReport: AttendanceWorkReportModel) {
    if (attendanceWorkReport.remoteWork) {
      return 'Praca zdalna';
    }
    return 'Praca w biurze';
  }

  previousWeek() {
    this.dateFrom = new Date(this.dateFrom.setDate(this.dateFrom.getDate() - 7));
    this.dateTo = new Date(this.dateTo.setDate(this.dateTo.getDate() - 7));
    this.dateFromForm.setValue(this.dateFrom);
    this.dateToForm.setValue(this.dateTo);
    if (this.selectedUser.value) {
      this.getAttendanceWorkForSelectedWeek();
    } else {
      this.prepareTable();
    }
  }

  nextWeek() {
    this.dateFrom = new Date(this.dateFrom.setDate(this.dateFrom.getDate() + 7));
    this.dateTo = new Date(this.dateTo.setDate(this.dateTo.getDate() + 7));
    this.dateFromForm.setValue(this.dateFrom);
    this.dateToForm.setValue(this.dateTo);
    if (this.selectedUser.value) {
      this.getAttendanceWorkForSelectedWeek();
    } else {
      this.prepareTable();
    }
  }

  get selectedUser() {
    return this.form.get('selectedUser');
  }

  get dateFromForm() {
    return this.form.get('dateFromForm');
  }

  get dateToForm() {
    return this.form.get('dateToForm');
  }

}
