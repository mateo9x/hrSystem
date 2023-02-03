import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup, Validators} from "@angular/forms";
import {AnnotationForUsersRequest} from "../../../models/annotation-for-user.model";

@Injectable({
  providedIn: 'root'
})
export class NewAnnotationFormService {

  constructor() {
  }

  public getValidatorsForUsers() {
    return [null, [Validators.required]];
  }

  public getValidatorsForMessage() {
    return [null, [Validators.required, Validators.minLength(20), Validators.maxLength(255)]];
  }

  public convertFormToNewAnnotationRequest(fb: FormGroup): AnnotationForUsersRequest {
    let data = new AnnotationForUsersRequest();
    data.createDate = new Date();
    data.userIds = this.convertFormToUserIds(fb.get('selectedUsers'));
    data.message = this.convertFormToMessage(fb.get('annotationMessage'));
    return data;
  }

  private convertFormToUserIds(control: AbstractControl): number[] {
    return control.value;
  }

  private convertFormToMessage(control: AbstractControl): string {
    return control.value;
  }

}
