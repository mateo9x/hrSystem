import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
  }

  public setStyle(theme: Theme) {
    switch (theme) {
      case Theme.default: {
        document.documentElement.style.setProperty('--main-color', '#3f51b5');
        document.documentElement.style.setProperty('--main-color-hover', '#2b3983');
      }
        break;
      case Theme.green: {
        document.documentElement.style.setProperty('--main-color', '#60993E');
        document.documentElement.style.setProperty('--main-color-hover', '#397a47');
      }
        break;
      case Theme.blue: {
        document.documentElement.style.setProperty('--main-color', '#6cbeed');
        document.documentElement.style.setProperty('--main-color-hover', '#4b82a2');
      }
        break;
      case Theme.yellow: {
        document.documentElement.style.setProperty('--main-color', '#dcbb3a');
        document.documentElement.style.setProperty('--main-color-hover', '#bea233');
      }
        break;
    }
  }
}

export enum Theme {
  default = 'default',
  green = 'green',
  blue = 'blue',
  yellow = 'yellow'
}

export function getThemeByValue(value: string) {
  const index = Object.values(Theme).indexOf(value as Theme);
  return Object.keys(Theme)[index] as Theme;
}
