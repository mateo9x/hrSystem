import {Component, ElementRef, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AnnotationForUserApiService} from "../../../services/api/annotation-for-user-api.service";
import {AnnotationForUserWebsocketService} from "../../../services/websocket/annotation-for-user-websocket.service";

@Component({
  selector: 'user-annotations',
  templateUrl: './user-annotations.component.html',
  styleUrls: ['./user-annotations.component.scss']
})
export class UserAnnotationsComponent implements OnChanges {
  annotationDialogOpened = false;
  annotations: any[] = [];
  @Input() userId: number;

  constructor(private eRef: ElementRef, private annotationForUserService: AnnotationForUserApiService,
              private annotationForUserWebsocketService: AnnotationForUserWebsocketService) {
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

  ngOnChanges(changes: SimpleChanges): void {
    this.userId = changes.userId.currentValue;
    if (this.userId) {
      this.annotationForUserWebsocketService.connect(this.userId);
      this.annotationForUserWebsocketService.annotationsWebSocket.subscribe({
        next: (annotations) => {
          this.annotations = annotations;
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
