import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AttendanceWorkReportModel} from "../../../../models/attendance-work-report.model";

@Component({
  selector: 'attendance-work-report-edit-dialog',
  templateUrl: './attendance-work-report-edit-dialog.component.html',
  styleUrls: ['./attendance-work-report-edit-dialog.component.scss']
})
export class AttendanceWorkReportEditDialogComponent implements OnInit {
  editForm = false;
  form: FormGroup;
  workTypes = [
    {label: 'Praca zdalna', value: true},
    {label: 'Praca w biurze', value: false}
  ];

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AttendanceWorkReportEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public attendanceWorkReport: AttendanceWorkReportModel) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      day: [null, [Validators.required]],
      selectedTypeOfWork: [null, [Validators.required]]
    });
    if (this.attendanceWorkReport.id) {
      this.selectedTypeOfWork.setValue(this.attendanceWorkReport.remoteWork);
      this.editForm = true;
    }
    this.day.setValue(this.attendanceWorkReport.date);
    this.day.disable();
  }

  save() {
    this.attendanceWorkReport.date = this.day.value;
    this.attendanceWorkReport.remoteWork = this.selectedTypeOfWork.value;
    this.dialogRef.close({data: this.attendanceWorkReport, type: 'save'});
  }

  update() {
    this.attendanceWorkReport.date = this.day.value;
    this.attendanceWorkReport.remoteWork = this.selectedTypeOfWork.value;
    this.dialogRef.close({data: this.attendanceWorkReport, type: 'update'});
  }

  remove() {
    this.attendanceWorkReport.date = this.day.value;
    this.dialogRef.close({data: this.attendanceWorkReport, type: 'remove'});
  }

  cancel() {
    this.dialogRef.close();
  }

  get day() {
    return this.form.get('day');
  }

  get selectedTypeOfWork() {
    return this.form.get('selectedTypeOfWork');
  }

}
