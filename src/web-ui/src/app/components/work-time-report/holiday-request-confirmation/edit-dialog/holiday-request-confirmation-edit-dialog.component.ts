import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {HolidayRequest, HolidayRequestStatus} from "../../../../models/holiday-request.model";
import {HolidayRequestApiService} from "../../../../services/api/holiday-request-api.service";
import {SnackBarType} from "../../../../services/material/snackbar.service";

@Component({
  selector: 'holiday-request-confirmation-edit-dialog',
  templateUrl: './holiday-request-confirmation-edit-dialog.component.html',
  styleUrls: ['./holiday-request-confirmation-edit-dialog.component.scss']
})
export class HolidayRequestConfirmationEditDialogComponent implements OnInit {
  selectedStatus = new FormControl('');
  statuses: HolidayRequestStatus[] = [];

  constructor(private dialogRef: MatDialogRef<HolidayRequestConfirmationEditDialogComponent>, private holidayRequestService: HolidayRequestApiService,
              @Inject(MAT_DIALOG_DATA) public holidayRequest: HolidayRequest) {
  }

  ngOnInit() {
    this.prepareDialogData();
  }

  prepareDialogData() {
    this.holidayRequestService.getAllHolidayRequestStatuses().subscribe({
      next: (response) => {
        this.statuses = response.filter((status) => status.name !== 'Wysłano');
      }
    });
  }

  saveRequest() {
    const newStatus = this.getHolidayRequestStatus(parseInt(this.selectedStatus.value));
    this.holidayRequest.holidayRequestStatusId = newStatus.id;
    this.holidayRequest.holidayRequestStatusName = newStatus.name;

    this.holidayRequestService.updateHolidayRequest(this.holidayRequest).subscribe({
      next: () => {
        this.dialogRef.close({message: 'Wniosek urlopowy został zaaktualizowany', type: SnackBarType.SUCCESS});
      },
      error: () => {
        this.dialogRef.close({message: 'Wniosek urlopowy nie został zaaktualizowany', type: SnackBarType.ERROR});
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  getHolidayRequestStatus(id: number) {
    return this.statuses.find(status => status.id === id);
  }

}
