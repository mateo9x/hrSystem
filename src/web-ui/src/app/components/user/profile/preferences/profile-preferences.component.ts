import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {FormControl} from "@angular/forms";
import {getThemeByValue, ThemeService} from "../../../../services/theme/theme.service";
import {User} from "../../../../models/user.model";
import {SnackBarService, SnackBarType} from "../../../../services/material/snackbar.service";
import {AuthenticationService} from "../../../../services/authentication.service";

@Component({
  selector: 'profile-preferences',
  templateUrl: './profile-preferences.component.html',
  styleUrls: ['./profile-preferences.component.scss']
})
export class ProfilePreferencesComponent implements OnInit {

  user: User;
  selectedTheme = new FormControl('');
  themeSaved = true;
  themes = [
    {label: 'Domyślny', value: 'default'},
    {label: 'Zielony', value: 'green'},
    {label: 'Niebieski', value: 'blue'},
    {label: 'Żółty', value: 'yellow'}
  ]

  constructor(private userService: UserService, private themeService: ThemeService, private snackBarService: SnackBarService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.getUserByCookieJWT().subscribe({
      next: (response) => {
        this.user = response;
        this.setSelectedTheme();
      }
    });
  }

  changeTheme() {
    this.themeService.setStyle(getThemeByValue(this.selectedTheme.value));
    this.themeSaved = false;
  }

  setSelectedTheme() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.selectedTheme.setValue(theme);
    }
    this.themeSaved = true;
  }

  save() {
    localStorage.setItem('theme', this.selectedTheme.value);
    this.themeSaved = true;
    this.snackBarService.openSnackBar('Preferencje zapisane pomyślnie', SnackBarType.SUCCESS);
  }

}
