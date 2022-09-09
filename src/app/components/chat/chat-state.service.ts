import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatStateService {
  historyMessages = new BehaviorSubject([]);
  currentMessages = new BehaviorSubject([]);
  private _currentMassage = [];

  addCurrentMessage(messageText: string, user) {
    this._currentMassage.push({
      data: messageText,
      position: 'right',
      user,
      date: new Date(),
    });
    this.currentMessages.next(this._currentMassage);
  }
}
