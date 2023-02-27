import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../models/user.model";
import {UserService} from "../../../../services/user.service";
import {FormControl} from "@angular/forms";
import {Role} from "../../../../models/role.model";
import {RoleService} from "../../../../services/role.service";
import {SnackBarType} from "../../../../services/material/snackbar.service";

@Component({
  selector: 'user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {
  selectedRoles = new FormControl('');
  roles: Role[] = [];

  constructor(private dialogRef: MatDialogRef<UserEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public user: User,
              private userService: UserService, private roleService: RoleService) {
  }

  ngOnInit() {
    this.roleService.getAllRoles().subscribe({
      next: (rolesResponse) => {
       this.roles = rolesResponse;
       this.fillDropdownWithUserRoles();
      }
    });
  }

  fillDropdownWithUserRoles() {
    this.selectedRoles.setValue(this.user.roles);
  }

  saveUser() {
    this.user.roles = this.selectedRoles.value;
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        this.dialogRef.close({message: 'Dane użytkownika zaaktualizowane', type: SnackBarType.SUCCESS});
      },
      error: () => {
        this.dialogRef.close({message: 'Dane użytkownika nie zostały zaaktualizowane', type: SnackBarType.ERROR});
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
