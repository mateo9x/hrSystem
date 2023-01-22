import {Component} from "@angular/core";
import {User} from "../../../models/user.model";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: User;

  constructor() {
  }

}
