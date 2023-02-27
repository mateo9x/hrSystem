import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AttendanceWorkDay, DicAttendanceWorkType} from "../../../../models/attendance-work-report.model";

@Injectable({
  providedIn: 'root'
})
export class AttendanceWorkWeekDialogFormService {

  constructor() {
  }

  public getFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      day: null,
      selectedDicAttendanceWorkType: this.getValidatorsForSelectedDicAttendanceWorkType(),
      hours: this.getValidatorsForHours(),
      comment: this.getValidatorsForComment()
    });
  }

  public loadDataForNewDialog(fb: FormGroup, attendanceWorkDay: AttendanceWorkDay): void {
    this.getDayControl(fb).setValue(attendanceWorkDay.attendanceWorkReport.date);
    this.getDayControl(fb).disable();
  }

  public loadDataForEditDialog(fb: FormGroup, attendanceWorkDay: AttendanceWorkDay): void {
    this.getDayControl(fb).setValue(attendanceWorkDay.attendanceWorkReport.date);
    this.getDayControl(fb).disable();
    this.getCommentControl(fb).setValue(attendanceWorkDay.comment);
    this.getHoursControl(fb).setValue(attendanceWorkDay.hours);
    this.getSelectedDicAttendanceWorkTypeControl(fb).setValue(this.setValueForSelectedDicAttendanceWorkTypeControl(attendanceWorkDay));
  }

  private getValidatorsForSelectedDicAttendanceWorkType() {
    return [null, [Validators.required]];
  }

  private getValidatorsForHours() {
    return [null, [Validators.required, Validators.min(1), Validators.max(8)]];
  }

  private getValidatorsForComment() {
    return [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]];
  }

  public fillAttendanceWorkDayFields(fb: FormGroup, attendanceWorkDay: AttendanceWorkDay, dicAttendanceWorkTypes:  DicAttendanceWorkType[]): AttendanceWorkDay {
    attendanceWorkDay.comment = this.convertFormToComment(this.getCommentControl(fb));
    attendanceWorkDay.hours = this.convertFormToHours(this.getHoursControl(fb));
    attendanceWorkDay.dicAttendanceWorkType = this.convertFormToDicAttendanceWorkType(this.getSelectedDicAttendanceWorkTypeControl(fb), dicAttendanceWorkTypes);
    return attendanceWorkDay;
  }

  private getDayControl(fb: FormGroup): AbstractControl {
    return fb.get('day');
  }

  private getSelectedDicAttendanceWorkTypeControl(fb: FormGroup): AbstractControl {
    return fb.get('selectedDicAttendanceWorkType');
  }

  private getHoursControl(fb: FormGroup): AbstractControl {
    return fb.get('hours');
  }

  private getCommentControl(fb: FormGroup): AbstractControl {
    return fb.get('comment');
  }

  private convertFormToHours(control: AbstractControl): number {
    return control.value;
  }

  private convertFormToComment(control: AbstractControl): string {
    return control.value;
  }

  private convertFormToDicAttendanceWorkType(control: AbstractControl, dicAttendanceWorkTypes:  DicAttendanceWorkType[]) {
    const id = control.value as number;
    return dicAttendanceWorkTypes.find(dicAttendanceWorkType => dicAttendanceWorkType.id === id);
  }

  private setValueForSelectedDicAttendanceWorkTypeControl(attendanceWorkDay: AttendanceWorkDay) {
    if (attendanceWorkDay.dicAttendanceWorkType) {
      return attendanceWorkDay.dicAttendanceWorkType.id;
    }
    return null;
  }

  public clearForm(fb: FormGroup): void {
    this.getSelectedDicAttendanceWorkTypeControl(fb).setValue(null);
    this.getHoursControl(fb).setValue(null);
    this.getCommentControl(fb).setValue(null);
  }

}
