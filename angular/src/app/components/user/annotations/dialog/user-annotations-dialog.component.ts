import {Component, Inject, Input} from "@angular/core";
import {AnnotationForUser} from "../../../../models/annotation-for-user.model";
import {AnnotationForUserService} from "../../../../services/annotation-for-user.service";
import {UserAnnotationsComponent} from "../user-annotations.component";

@Component({
  selector: 'user-annotations-dialog',
  templateUrl: './user-annotations-dialog.component.html',
  styleUrls: ['./user-annotations-dialog.component.scss']
})
export class UserAnnotationsDialogComponent {
  @Input() annotations: AnnotationForUser[] = [];

  constructor(private annotationForUserService: AnnotationForUserService, @Inject(UserAnnotationsComponent) private userAnnotationsComponent: UserAnnotationsComponent) {
  }

  deleteAnnotation(selectedAnnotation: AnnotationForUser) {
    this.annotationForUserService.deleteAnnotationById(selectedAnnotation.id).subscribe({
      next: (response) => {
        if (response) {
          this.userAnnotationsComponent.annotations = this.annotations.filter(annotation => annotation.id != selectedAnnotation.id);
        }
      }
    });
  }

  annotationReadedChange(selectedAnnotation: AnnotationForUser) {
    selectedAnnotation.readedChanged = true;
  }

}
