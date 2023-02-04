import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {SnackBarService, SnackBarType} from "../../../services/material/snackbar.service";
import {
  ConfirmationDialogComponent,
  ConfirmationDialogModel
} from "../../dialogs/confirmation-dialog/confirmation-dialog.component";
import {User} from "../../../models/user.model";
import {HolidayRequestService} from "../../../services/holiday-request.service";
import {HolidayRequest} from "../../../models/holiday-request.model";
import {HolidayRequestAddDialogComponent} from "./add-dialog/holiday-request-add-dialog.component";
import {DateFormatterService} from "../../../services/date.service";

@Component({
  selector: 'holiday-request',
  templateUrl: './holiday-request.component.html',
  styleUrls: ['./holiday-request.component.scss']
})
export class HolidayRequestComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: any[] = [
    {label: 'Data od', value: 'dateFrom'},
    {label: 'Data do', value: 'dateTo'},
    {label: 'Łącznie ilość godzin', value: 'totalHours'},
    {label: 'Rodzaj urlopu', value: 'holidayRequestTypeName'},
    {label: 'Status', value: 'holidayRequestStatusName'},
    {label: 'Komentarz', value: 'comment'}
  ];
  displayedColumnsKeys = this.displayedColumns.map(col => col.value);
  user: User;
  dateFrom: Date;
  dateTo: Date;
  selectedRow: any;
  selection = new SelectionModel<any>(false, null);

  constructor(private userService: UserService, private holidayRequestService: HolidayRequestService, private dialog: MatDialog,
              private snackBarService: SnackBarService, private dateFormatterService: DateFormatterService) {
  }

  ngOnInit() {
    this.setDates();
    this.getUser();
  }

  setDates() {
    this.dateFrom = new Date();
    this.dateTo = new Date();
    this.dateTo.setDate(new Date().getDate() + 7);
  }

  getUser() {
    this.userService.getUserByJWTToken().subscribe({
      next: (userResponse) => {
        this.user = userResponse;
        this.getHolidayRequests();
      }
    });
  }

  getHolidayRequests() {
    this.holidayRequestService.getAllHolidayRequestsForUserBetweenSelectedDates(this.user.id, this.dateFormatterService.convertDateToJavaLocalDate(this.dateFrom), this.dateFormatterService.convertDateToJavaLocalDate(this.dateTo)).subscribe({
      next: (holidayRequests) => {
        this.dataSource = new MatTableDataSource(holidayRequests);
      }
    });
  }

  selectRow(row: any) {
    if (this.selectedRow === row) {
      this.selectedRow = undefined;
      row = undefined;
    } else {
      this.selectedRow = row;
    }
  }

  addRequest() {
    let dialogRef = this.dialog.open(HolidayRequestAddDialogComponent, {
      data: Object.assign({}, this.user)
    });
    dialogRef.afterClosed().subscribe({
      next: (closingMessage) => {
        if (closingMessage) {
          this.snackBarService.openSnackBar(closingMessage.message, closingMessage.type);
          this.getHolidayRequests();
        }
      }
    });
  }

  deleteRequest(holidayRequest: HolidayRequest) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: this.prepareConfirmationDialogData()
    });
    dialogRef.afterClosed().subscribe({
      next: (closingMessage) => {
        if (closingMessage.accept) {
          this.holidayRequestService.deleteHolidayRequest(holidayRequest.id).subscribe({
            next: () => {
              this.snackBarService.openSnackBar('Wniosek urlopowy pomyślnie usunięty', SnackBarType.SUCCESS);
              this.getHolidayRequests();
            },
            error: () => {
              this.snackBarService.openSnackBar('Próba usunięcia wniosku urlopowego nie powiodła się', SnackBarType.ERROR);
            }
          });
        }
      }
    });
  }

  prepareConfirmationDialogData(): ConfirmationDialogModel {
    return {
      header: 'Potwierdź usunięcie wniosku',
      text: `Czy na pewno chcesz usunąć wybran wniosek urlopowy ?`,
      acceptButtonLabel: 'TAK',
      declineButtonLabel: 'NIE'
    };
  }

}
