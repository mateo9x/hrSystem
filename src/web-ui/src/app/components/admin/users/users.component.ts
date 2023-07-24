import {Component, OnInit} from "@angular/core";
import {UserApiService} from "../../../services/api/user-api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {UserEditDialogComponent} from "./user-edit-dialog/user-edit-dialog.component";
import {SnackBarService, SnackBarType} from "../../../services/material/snackbar.service";
import {
  ConfirmationDialogComponent,
  ConfirmationDialogModel
} from "../../dialogs/confirmation-dialog/confirmation-dialog.component";
import {User} from "../../../models/user.model";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: any[] = [
    {label: 'Imię', value: 'firstName'},
    {label: 'Nazwisko', value: 'lastName'},
    {label: 'Adres e-mail', value: 'email'},
    {label: 'Pesel', value: 'pesel'}
  ];
  displayedColumnsKeys = this.displayedColumns.map(col => col.value);
  selectedRow: any;

  constructor(private userService: UserApiService, private dialog: MatDialog,
              private snackBarService: SnackBarService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.authenticationService.getUserByCookieJWT().subscribe({
          next: (response) => {
            const usersFiltered = users.filter(user => user.id !== response.id);
            this.dataSource = new MatTableDataSource(usersFiltered);
          }
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.selectedRow = undefined;
  }

  selectRow(row: any) {
    if (this.selectedRow === row) {
      this.selectedRow = undefined;
      row = undefined;
    } else {
      this.selectedRow = row;
    }
  }

  isRowSelected() {
    return this.dataSource && this.dataSource.data.length === 0 || this.selectedRow === undefined;
  }

  editUser() {
    let dialogRef = this.dialog.open(UserEditDialogComponent, {
      data: Object.assign({}, this.selectedRow)
    });
    dialogRef.afterClosed().subscribe({
      next: (closingMessage) => {
        if (closingMessage) {
          this.selectedRow = undefined;
          this.snackBarService.openSnackBar(closingMessage.message, closingMessage.type);
          this.getUsers();
        }
      }
    });
  }

  deleteUserConfirmation(user: User) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: this.prepareConfirmationDialogData(user)
    });
    dialogRef.afterClosed().subscribe({
      next: (closingMessage) => {
        if (closingMessage.accept) {
          this.selectedRow = undefined;
          this.deleteUser(user.id);
        }
      }
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('Użytkownik pomyślnie usunięty', SnackBarType.SUCCESS);
        this.getUsers();
      },
      error: () => {
        this.snackBarService.openSnackBar('Próba usunięcia użytkownika nie powiodła się', SnackBarType.ERROR);
      }
    });
  }

  prepareConfirmationDialogData(user: User): ConfirmationDialogModel {
    return {
      header: 'Potwierdź usunięcie użytkownika',
      text: `Czy na pewno chcesz usunąć użytkownika ${user.firstName} ${user.lastName} z systemu ?`,
      acceptButtonLabel: 'TAK',
      declineButtonLabel: 'NIE'
    };
  }

}
