import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {AnnotationForUser} from "../../../models/annotation-for-user.model";
import {AnnotationForUserService} from "../../../services/annotation-for-user.service";

@Component({
  selector: 'user-annotations',
  templateUrl: './user-annotations.component.html',
  styleUrls: ['./user-annotations.component.scss']
})
export class UserAnnotationsComponent implements OnInit {
  annotationDialogOpened = false;
  annotations: AnnotationForUser[] = [];
  @Input() userId: number;

  constructor(private eRef: ElementRef, private annotationForUserService: AnnotationForUserService) {
  }

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      const annotationsModified = this.annotations.filter(annotation => annotation.readedChanged);
      if (annotationsModified.length > 0 && this.annotationDialogOpened) {
        const ids = annotationsModified.map(annotation => annotation.id);
        this.annotationForUserService.updateAnnotationsReadedValues(ids).subscribe();
      }
      this.annotationDialogOpened = false;
    }
  }

  ngOnInit() {
    if (this.userId) {
      this.annotationForUserService.getAnnotationsForUser(this.userId).subscribe({
        next: (response) => {
          this.annotations = response;
        },
        error: () => {
          this.annotations = [];
        }
      });
    }
  }

  toggleAnnotationDialog() {
    this.annotationDialogOpened = !this.annotationDialogOpened;
  }

  atLeastOneAnnotationNotReaded() {
    const annotationNotReaded = this.annotations.find(annotation => !annotation.readed);
    return !!annotationNotReaded;
  }

}
