import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { messagesUser_1, userIvan, userSergey } from './mock-chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
  valueInput = '';
  messages: any = [];
  user: any;
  interlocutors: any;
  listUsers: any = [];
  tabIndex = 0;
  constructor(private _ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.user = userIvan;
      this.listUsers = userSergey;
      this.parseMessages(messagesUser_1);
    }, 1000);
  }

  parseMessages(messages: any[]) {
    if (!messages?.length && this.tabIndex !== 1) {
      return;
    }
    let parseMessagesUser: any = [];
    messages.forEach((message) => {
      if (message.firstName !== this.user.firstName) {
        parseMessagesUser.push({ ...message, position: 'left' });
      } else {
        parseMessagesUser.push({ ...message, position: 'right' });
      }
    });
    this.messages = parseMessagesUser;
    this._ref.detectChanges();
  }

  handleSendMessage(event?: KeyboardEvent) {
    if (!this.valueInput.trim()) {
      return;
    }
    if (event && event.code !== 'Enter') {
      return;
    }
    this.messages.push({
      message: this.valueInput,
      position: 'right',
      ...userIvan,
      date: new Date(),
    });
    //url
    this.valueInput = '';
    this._ref.reattach();
  }

  cache = [];

  changeTab(event: any) {
    switch (event.tab.textLabel) {
      case 'Sergey':
        this.messages = this.cache.length ? this.cache : this.messages;
        break;
      default:
        this.cache = this.messages;
        this.messages = [];
        break;
    }
    this._ref.reattach();

    console.log(event.tab.textLabel);
  }
}
