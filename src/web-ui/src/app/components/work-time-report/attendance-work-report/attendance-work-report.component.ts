import {Component, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {AttendanceWorkApiService} from "../../../services/api/attendance-work-api.service";
import {UserApiService} from "../../../services/api/user-api.service";
import {AttendanceWorkReportModel} from "../../../models/attendance-work-report.model";
import {SnackBarService, SnackBarType} from "../../../services/material/snackbar.service";
import {User} from "../../../models/user.model";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'attendance-work-report',
  templateUrl: './attendance-work-report.component.html',
  styleUrls: ['./attendance-work-report.component.scss']
})
export class AttendanceWorkReportComponent implements OnInit {
  user: User;
  cookieJWT: string;
  attendanceExists = false;
  selectedWorkType = new FormControl('');
  userAlreadySavedTodayAttendanceWorkReport: AttendanceWorkReportModel = new AttendanceWorkReportModel();
  workTypes = [
    {label: 'Praca zdalna', value: true},
    {label: 'Praca w biurze', value: false}
  ];

  constructor(private attendanceWorkReportService: AttendanceWorkApiService, private userService: UserApiService,
              private snackBarService: SnackBarService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.getUserByCookieJWT().subscribe({
      next: (response) => {
        if (response) {
          this.user = response;
          this.userAlreadySavedTodayAttendanceWorkReport.userId = response.id;
          this.attendanceWorkReportService.getUserSavedAttendanceWorkReportForToday(response.id).subscribe({
            next: (userSavedAttendanceWorkReport) => {
              if (userSavedAttendanceWorkReport) {
                this.attendanceExists = true;
                this.selectedWorkType.setValue(userSavedAttendanceWorkReport.remoteWork as unknown as string);
                this.userAlreadySavedTodayAttendanceWorkReport = userSavedAttendanceWorkReport;
              }
            }
          });
        }
      }
    });
  }

  saveAttendanceWorkReport() {
    this.userAlreadySavedTodayAttendanceWorkReport.remoteWork = this.selectedWorkType.value as unknown as boolean;
    this.attendanceWorkReportService.saveAttendanceWorkReport(this.userAlreadySavedTodayAttendanceWorkReport).subscribe({
      next: (saveResponse) => {
        this.attendanceExists = true;
        this.snackBarService.openSnackBar('Pomyślnie zgłoszono dzisiejszą obecność w pracy', SnackBarType.SUCCESS);
        this.userAlreadySavedTodayAttendanceWorkReport = saveResponse;
      },
      error: () => {
        this.snackBarService.openSnackBar('Nie udało się potwierdzić dzisiejszej obecności w pracy', SnackBarType.ERROR);
      }
    });
  }

  updateAttendanceWorkReport() {
    this.userAlreadySavedTodayAttendanceWorkReport.remoteWork = this.selectedWorkType.value as unknown as boolean;
    this.attendanceWorkReportService.updateAttendanceWorkReport(this.userAlreadySavedTodayAttendanceWorkReport).subscribe({
      next: (updateResponse) => {
        this.attendanceExists = true;
        this.snackBarService.openSnackBar('Pomyślnie zaaktualizowano dzisiejszą obecność w pracy', SnackBarType.SUCCESS);
        this.userAlreadySavedTodayAttendanceWorkReport = updateResponse;
      },
      error: () => {
        this.snackBarService.openSnackBar('Nie udało się zaaktualizować dzisiejszej obecności w pracy', SnackBarType.ERROR);
      }
    });
  }

  isSelectedWorkTypeProperFilled() {
    const booleanValue = this.selectedWorkType.value as unknown as boolean;
    return booleanValue === true || booleanValue === false;
  }

}
