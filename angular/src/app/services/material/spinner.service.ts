import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  loading = new BehaviorSubject(false);

  constructor() {
  }

  public setLoading(loading: boolean) {
    this.loading.next(loading);
  }

}
