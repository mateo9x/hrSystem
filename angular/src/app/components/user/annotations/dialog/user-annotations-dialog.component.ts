import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {AnnotationForUser} from "../../../../models/annotation-for-user.model";
import {AnnotationForUserService} from "../../../../services/annotation-for-user.service";
import {AnnotationForUserWebsocketService} from "../../../../services/websocket/annotation-for-user-websocket.service";

@Component({
  selector: 'user-annotations-dialog',
  templateUrl: './user-annotations-dialog.component.html',
  styleUrls: ['./user-annotations-dialog.component.scss']
})
export class UserAnnotationsDialogComponent implements OnChanges {
  @Input() annotations: any[] = [];
  @Input() userId: number;

  constructor(private annotationForUserService: AnnotationForUserService,
              private annotationForUserWebsocketService: AnnotationForUserWebsocketService) {
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

}
