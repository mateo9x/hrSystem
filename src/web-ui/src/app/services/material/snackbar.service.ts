import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar:MatSnackBar) { }

  openSnackBar(message: string, type: SnackBarType) {
    const style = this.getStyle(type);
    this.snackBar.open(message, 'OK', {
      panelClass: style
    });
  }

  getStyle(type: SnackBarType): string {
    switch(type) {
      case SnackBarType.SUCCESS: return 'snack-bar-success';
      case SnackBarType.WARN: return 'snack-bar-warn';
      case SnackBarType.ERROR: return 'snack-bar-error';
    }
  }
}

export enum SnackBarType {
  SUCCESS,
  WARN,
  ERROR
}
