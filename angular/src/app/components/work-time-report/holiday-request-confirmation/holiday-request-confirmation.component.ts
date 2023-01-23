import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {SnackBarService} from "../../../services/material/snackbar.service";
import {HolidayRequestService} from "../../../services/holiday-request.service";
import {DateFormatterService} from "../../../services/date.service";
import {
  HolidayRequestConfirmationEditDialogComponent
} from "./edit-dialog/holiday-request-confirmation-edit-dialog.component";

@Component({
  selector: 'holiday-request-confirmation',
  templateUrl: './holiday-request-confirmation.component.html',
  styleUrls: ['./holiday-request-confirmation.component.scss']
})
export class HolidayRequestConfirmationComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: any[] = [
    {label: 'Użytkownik', value: 'userFullName'},
    {label: 'Adres e-mail', value: 'userEmail'},
    {label: 'Data od', value: 'dateFrom'},
    {label: 'Data do', value: 'dateTo'},
    {label: 'Łącznie ilość godzin', value: 'totalHours'},
    {label: 'Rodzaj urlopu', value: 'holidayRequestTypeName'},
    {label: 'Status', value: 'holidayRequestStatusName'},
    {label: 'Komentarz', value: 'comment'}
  ];
  displayedColumnsKeys = this.displayedColumns.map(col => col.value);
  dateFrom: Date;
  dateTo: Date;
  selectedRow: any;
  selection = new SelectionModel<any>(false, null);

  constructor(private holidayRequestService: HolidayRequestService, private dialog: MatDialog,
              private snackBarService: SnackBarService, private dateFormatterService: DateFormatterService) {
  }

  ngOnInit() {
    this.setDates();
    this.getHolidayRequests();
  }

  setDates() {
    this.dateFrom = new Date();
    this.dateTo = new Date();
    this.dateTo.setDate(new Date().getDate() + 7);
  }

  getHolidayRequests() {
    this.holidayRequestService.getAllHolidayRequestsBetweenSelectedDates(this.dateFormatterService.convertDateToJavaLocalDate(this.dateFrom), this.dateFormatterService.convertDateToJavaLocalDate(this.dateTo)).subscribe({
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

  editRequest(selectedRow: any) {
    let dialogRef = this.dialog.open(HolidayRequestConfirmationEditDialogComponent, {
      data: Object.assign({}, selectedRow)
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

}
