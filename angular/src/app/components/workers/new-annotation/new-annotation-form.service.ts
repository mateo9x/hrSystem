import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnnotationForUsersRequest} from "../../../models/annotation-for-user.model";

@Injectable({
  providedIn: 'root'
})
export class NewAnnotationFormService {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedUsers: this.getValidatorsForUsers(),
      annotationMessage: this.getValidatorsForMessage()
    });
  }

  public getFormGroup(): FormGroup {
    return this.form;
  }

  private getValidatorsForUsers() {
    return [null, [Validators.required]];
  }

  private getValidatorsForMessage() {
    return [null, [Validators.required, Validators.minLength(20), Validators.maxLength(255)]];
  }

  public convertFormToNewAnnotationRequest(fb: FormGroup): AnnotationForUsersRequest {
    let data = new AnnotationForUsersRequest();
    data.createDate = new Date();
    data.userIds = this.convertFormToUserIds(this.getSelectedUsersControl(fb));
    data.message = this.convertFormToMessage(this.getMessageControl(fb));
    return data;
  }

  private getSelectedUsersControl(fb: FormGroup): AbstractControl {
    return fb.get('selectedUsers');
  }

  private getMessageControl(fb: FormGroup): AbstractControl {
    return fb.get('annotationMessage');
  }

  private convertFormToUserIds(control: AbstractControl): number[] {
    return control.value;
  }

  private convertFormToMessage(control: AbstractControl): string {
    return control.value;
  }

  public clearForm(fb: FormGroup): void {
    this.getSelectedUsersControl(fb).setValue(null);
    this.getMessageControl(fb).setValue(null);
  }

}
