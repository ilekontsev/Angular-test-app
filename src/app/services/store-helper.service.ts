import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreHelperService {
  isDisableNavigationPanel = new BehaviorSubject(false);

  constructor() {}
}
