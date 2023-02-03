import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {SnackBarService, SnackBarType} from "../../../services/material/snackbar.service";
import {FormGroup} from "@angular/forms";
import {User} from "../../../models/user.model";
import {NewAnnotationFormService} from "./new-annotation-form.service";
import {AnnotationForUsersRequest} from "../../../models/annotation-for-user.model";
import {AnnotationForUserService} from "../../../services/annotation-for-user.service";

@Component({
  selector: 'new-annotation',
  templateUrl: './new-annotation.component.html',
  styleUrls: ['./new-annotation.component.scss']
})
export class NewAnnotationComponent implements OnInit {
  users: User[] = [];
  newAnnotationRequest: AnnotationForUsersRequest = new AnnotationForUsersRequest();
  newAnnotationForm: FormGroup;

  constructor(private userService: UserService, private snackBarService: SnackBarService,
              private newAnnotationFormService: NewAnnotationFormService, private annotationForUserService: AnnotationForUserService) {
    this.newAnnotationForm = this.newAnnotationFormService.getFormGroup();
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: () => {
        this.snackBarService.openSnackBar('Nie udało pobrać się użytkowników', SnackBarType.ERROR);
      }
    });
  }

  sendAnnotations() {
    this.newAnnotationRequest = this.newAnnotationFormService.convertFormToNewAnnotationRequest(this.newAnnotationForm);
    this.annotationForUserService.saveAnnotationsForUsers(this.newAnnotationRequest).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('Powiadomienie wysłane pomyślnie', SnackBarType.SUCCESS);
        this.newAnnotationFormService.clearForm(this.newAnnotationForm);
      },
      error: () => {
        this.snackBarService.openSnackBar('Nie udało wysłać się powiadomienia', SnackBarType.ERROR);
      }
    })
  }

  get annotationMessage() {
    return this.newAnnotationForm.get('annotationMessage');
  }

}
