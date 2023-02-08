import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AttendanceWorkReportEditFormService {

  constructor() {
  }

  public getFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      selectedUser: this.getValidatorsForSelectedUser(),
      dateFromForm: this.getValidatorsForDate(),
      dateToForm: this.getValidatorsForDate()
    });
  }

  private getValidatorsForSelectedUser() {
    return [null, [Validators.required]];
  }

  private getValidatorsForDate() {
    return [null, [Validators.required]];
  }

  public getUserIdValue(fg: FormGroup): number {
    return this.convertFormToUserId(this.getSelectedUserControl(fg));
  }

  private getSelectedUserControl(fg: FormGroup): AbstractControl {
    return fg.get('selectedUser');
  }

  private convertFormToUserId(control: AbstractControl): number {
    return control.value;
  }

}
