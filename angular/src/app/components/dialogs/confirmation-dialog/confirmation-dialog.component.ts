import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogModel) {
  }

  accept() {
    this.dialogRef.close({accept: true});
  }

  cancel() {
    this.dialogRef.close({accept: false});
  }

}

export class ConfirmationDialogModel {
  header: string;
  text: string;
  acceptButtonLabel: string;
  declineButtonLabel: string;
}
