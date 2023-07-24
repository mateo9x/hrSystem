import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../models/user.model";
import {UserApiService} from "../../../../services/api/user-api.service";
import {FormGroup} from "@angular/forms";
import {Role} from "../../../../models/role.model";
import {RoleApiService} from "../../../../services/api/role-api.service";
import {SnackBarType} from "../../../../services/material/snackbar.service";
import {UserEditFormService} from "./user-edit.form.service";

@Component({
  selector: 'user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {
  form: FormGroup;
  roles: Role[] = [];

  constructor(private formService: UserEditFormService,
              private dialogRef: MatDialogRef<UserEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User,
              private userService: UserApiService,
              private roleService: RoleApiService) {
    this.form = this.formService.getFormGroup();
  }

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe({
      next: (rolesResponse) => {
        this.roles = rolesResponse;
        this.formService.setupForm(this.form, this.user)
      }
    });
  }

  updateUser(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.userService.updateUser(this.formService.convertFormToUserRequest(this.form, this.user)).subscribe({
        next: () => {
          this.dialogRef.close({message: 'Dane użytkownika zaaktualizowane', type: SnackBarType.SUCCESS});
        },
        error: () => {
          this.dialogRef.close({message: 'Dane użytkownika nie zostały zaaktualizowane', type: SnackBarType.ERROR});
        }
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  hasFormError(formControl: string, errorName: string): boolean {
    return this.form.get(formControl).hasError(errorName);
  }

}
