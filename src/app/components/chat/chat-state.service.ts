import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatStateService {
  historyMessages = new BehaviorSubject([]);
  currentMessages = new Subject();
  isOpenEmoji = new BehaviorSubject(false);
  valueText = new Subject();

  private _currentMassages = [];

  addCurrentMessage(messageText: string = '', fileArr = [], user) {
    this._currentMassages.push({
      data: messageText,
      payload: [...fileArr],
      position: 'right',
      user,
      date: new Date(),
    });
    this.currentMessages.next(this._currentMassages);
  }

  deleteCurrentMessage(message) {
    this._currentMassages = this._currentMassages.filter(
      (item) => item !== message
    );
    this.currentMessages.next(this._currentMassages);
  }

  openEmoji() {
    this.isOpenEmoji.next(!this.isOpenEmoji.value);
  }
}
