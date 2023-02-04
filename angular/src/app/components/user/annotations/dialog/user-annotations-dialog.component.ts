import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {AnnotationForUser} from "../../../../models/annotation-for-user.model";
import {AnnotationForUserService} from "../../../../services/annotation-for-user.service";
import {AnnotationForUserWebsocketService} from "../../../../services/websocket/annotation-for-user-websocket.service";
import {MatDialog} from "@angular/material/dialog";
import {
  InformationDialogComponent,
  InformationDialogModel
} from "../../../dialogs/information-dialog/information-dialog.component";

@Component({
  selector: 'user-annotations-dialog',
  templateUrl: './user-annotations-dialog.component.html',
  styleUrls: ['./user-annotations-dialog.component.scss']
})
export class UserAnnotationsDialogComponent implements OnChanges {
  @Input() annotations: any[] = [];
  @Input() userId: number;

  constructor(private annotationForUserService: AnnotationForUserService,
              private annotationForUserWebsocketService: AnnotationForUserWebsocketService,
              private dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.annotations.currentValue) {
      this.annotations = this.annotations[this.annotations.length - 1];
    }
  }

  deleteAnnotation(selectedAnnotation: AnnotationForUser) {
    this.annotationForUserService.deleteAnnotationById(selectedAnnotation.id).subscribe({
      next: (response) => {
        if (response) {
          this.annotationForUserWebsocketService.sendMessage(this.userId);
          this.annotations = this.annotations.filter(annotation => annotation.id !== selectedAnnotation.id);
        }
      }
    });
  }

  annotationReadedChange(selectedAnnotation: AnnotationForUser) {
    selectedAnnotation.readedChanged = true;
  }

  openAnnotationDetail(selectedAnnotation: AnnotationForUser) {
    this.dialog.open(InformationDialogComponent, {
      data: this.prepareInformationDialogData(selectedAnnotation.message)
    });
  }

  prepareInformationDialogData(message: string): InformationDialogModel {
    return {
      header: 'Powiadomienie',
      text: message
    };
  }

}
