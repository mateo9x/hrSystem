import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'src/app/components/user/user.model';
import {UserService} from 'src/app/components/user/user.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: User = new User();
  cols: any[];
  loading: boolean;
  users: User[];

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  clear() {
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.password = '';
    this.user.password2 = '';
    this.user.email = '';
    this.user.street = '';
    this.user.streetNumber = '';
    this.user.city = '';
  }

  register() {
    this.userService.saveUser(this.user).subscribe((response) => {
      if (response !== null) {
        // this.toastService.createSuccessToast('Utworzono użytkownika pomyślnie');
        this.userService.newUserWelcomeMail(this.user).subscribe((response) => {
        });
        this.router.navigate(['']);
      } else {
        // this.toastService.createErrorToast('Użytkownik o takim loginie/e-mail-u już istnieje!');
      }

    }, (error) => {
      // this.toastService.createErrorToast('Użytkownik nie został utworzony');
    });
  }

}
