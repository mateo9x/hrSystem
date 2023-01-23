import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {HolidayRequest, HolidayRequestStatus, HolidayRequestType} from "../../../../models/holiday-request.model";
import {HolidayRequestService} from "../../../../services/holiday-request.service";
import {DateFormatterService} from "../../../../services/date.service";
import {User} from "../../../../models/user.model";
import {SnackBarType} from "../../../../services/material/snackbar.service";

@Component({
  selector: 'holiday-request-add-dialog',
  templateUrl: './holiday-request-add-dialog.component.html',
  styleUrls: ['./holiday-request-add-dialog.component.scss']
})
export class HolidayRequestAddDialogComponent implements OnInit {
  dateFrom = new Date();
  dateTo = new Date();
  holidayRequest: HolidayRequest = new HolidayRequest();
  selectedType = new FormControl('');
  statuses: HolidayRequestStatus[] = [];
  types: HolidayRequestType[] = [];

  constructor(private dialogRef: MatDialogRef<HolidayRequestAddDialogComponent>, private holidayRequestService: HolidayRequestService,
              private dateFormatterService: DateFormatterService, @Inject(MAT_DIALOG_DATA) public user: User) {
  }

  ngOnInit() {
    this.getStatuses();
    this.getTypes();
  }

  getStatuses() {
    this.holidayRequestService.getAllHolidayRequestStatuses().subscribe({
      next: (response) => {
        this.statuses = response;
      }
    });
  }

  getTypes() {
    this.holidayRequestService.getAllHolidayRequestTypes().subscribe({
      next: (response) => {
        this.types = response;
      }
    });
  }

  saveRequest() {
    this.holidayRequest.holidayRequestTypeId = this.getHolidayRequestType(parseInt(this.selectedType.value)).id;
    this.holidayRequest.holidayRequestStatusId = this.getHolidayRequestStatusForNewRequest().id;
    this.holidayRequest.dateFrom = this.dateFormatterService.convertDateToJavaLocalDate(this.dateFrom);
    this.holidayRequest.dateTo = this.dateFormatterService.convertDateToJavaLocalDate(this.dateTo);
    this.holidayRequest.totalHours = this.calculateTotalHours();
    this.holidayRequest.userId = this.user.id;

    this.holidayRequestService.getAllHolidayRequestsForUserBetweenSelectedDates(this.user.id, this.holidayRequest.dateFrom, this.holidayRequest.dateTo).subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.dialogRef.close({message: 'Wniosek urlopowy w wybranym zakresie czasu już istnieje', type: SnackBarType.WARN});
        } else {
          this.holidayRequestService.saveHolidayRequest(this.holidayRequest).subscribe({
            next: () => {
              this.dialogRef.close({message: 'Wniosek urlopowy został zapisany', type: SnackBarType.SUCCESS});
            },
            error: () => {
              this.dialogRef.close({message: 'Wniosek urlopowy nie został zapisany', type: SnackBarType.ERROR});
            }
          });
        }
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  getHolidayRequestType(id: number) {
    return this.types.find(type => type.id === id);
  }

  getHolidayRequestStatusForNewRequest() {
    return this.statuses.find(status => status.name === 'Wysłano');
  }

  calculateTotalHours() {
    const daysDiffrence = this.dateTo.getDate() - this.dateFrom.getDate();
    return (daysDiffrence * 8) + 8;
  }

}
