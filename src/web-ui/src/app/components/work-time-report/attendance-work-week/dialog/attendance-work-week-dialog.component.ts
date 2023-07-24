import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AttendanceWorkDay, DicAttendanceWorkType} from "../../../../models/attendance-work-report.model";
import {AttendanceWorkApiService} from "../../../../services/api/attendance-work-api.service";
import {AttendanceWorkWeekDialogFormService} from "./attendance-work-week-dialog.form.service";

@Component({
  selector: 'attendance-work-week-dialog',
  templateUrl: './attendance-work-week-dialog.component.html',
  styleUrls: ['./attendance-work-week-dialog.component.scss']
})
export class AttendanceWorkWeekDialogComponent implements OnInit {
  dicAttendanceWorkTypes: DicAttendanceWorkType[] = [];
  workWeekForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AttendanceWorkWeekDialogComponent>, private attendanceWorkService: AttendanceWorkApiService,
              @Inject(MAT_DIALOG_DATA) public attendanceWorkDay: AttendanceWorkDay, private attendanceWorkWeekDialogFormService: AttendanceWorkWeekDialogFormService) {
  }

  ngOnInit() {
    this.workWeekForm = this.attendanceWorkWeekDialogFormService.getFormGroup(this.fb);
    this.getAllDicAttendanceWorks();
    if (this.attendanceWorkDay.id) {
      this.attendanceWorkWeekDialogFormService.loadDataForEditDialog(this.workWeekForm, this.attendanceWorkDay);
    } else {
      this.attendanceWorkWeekDialogFormService.loadDataForNewDialog(this.workWeekForm, this.attendanceWorkDay);
    }
  }

  getAllDicAttendanceWorks() {
    this.attendanceWorkService.getAllDicAttendanceWorkTypes().subscribe({
      next: (response) => {
        this.dicAttendanceWorkTypes = response;
      }
    });
  }

  save() {
    this.attendanceWorkDay = this.attendanceWorkWeekDialogFormService.fillAttendanceWorkDayFields(this.workWeekForm, this.attendanceWorkDay, this.dicAttendanceWorkTypes);
    this.dialogRef.close({data: this.attendanceWorkDay, delete: false});
  }

  delete() {
    this.dialogRef.close({data: this.attendanceWorkDay.id, delete: true});
  }

  cancel() {
    this.dialogRef.close();
  }

  get day() {
    return this.workWeekForm.get('day');
  }

  get selectedDicAttendanceWorkType() {
    return this.workWeekForm.get('selectedDicAttendanceWorkType');
  }

  get hours() {
    return this.workWeekForm.get('hours');
  }

  get comment() {
    return this.workWeekForm.get('comment');
  }

}
