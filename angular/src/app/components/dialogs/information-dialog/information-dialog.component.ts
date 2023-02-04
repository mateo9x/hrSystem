import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.scss']
})
export class InformationDialogComponent {

  constructor(private dialogRef: MatDialogRef<InformationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: InformationDialogModel) {
  }

  accept() {
    this.dialogRef.close();
  }

}

export class InformationDialogModel {
  header: string;
  text: string;
}
