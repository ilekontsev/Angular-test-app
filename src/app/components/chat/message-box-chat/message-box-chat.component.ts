import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ChatStateService } from '../chat-state.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-message-box-chat',
  templateUrl: './message-box-chat.component.html',
  styleUrls: ['./message-box-chat.component.scss'],
})
export class MessageBoxChatComponent implements OnInit {
  currentMessages: any = [];
  historyMessages = [];
  tabIndex = 0;
  isOpenEmoji: boolean;
  valueInput = '';
  user = this._apiService.user;

  constructor(
    private _chatService: ChatService,
    private _apiService: ApiService,
    private _chatStateService: ChatStateService
  ) {}

  ngOnInit(): void {
    this.subscription();
  }

  subscription() {
    this._chatStateService.historyMessages.subscribe((res) => {
      this.parseMessages(res);
    });
    this._chatStateService.currentMessages.subscribe((res) => {
      this.currentMessages = res;
    });
  }

  parseMessages(messages: any[]) {
    if (!messages.length) {
      this.historyMessages[this.tabIndex] = [];
      this.currentMessages[this.tabIndex] = [];
      return;
    }

    let parseMessagesUser: any = [];

    const sortMessages = messages.sort((a, b) => {
      return a.date - b.date;
    });

    sortMessages.forEach((message) => {
      if (message.user.id !== this.user.id) {
        parseMessagesUser.push({ ...message, position: 'left' });
      } else {
        parseMessagesUser.push({ ...message, position: 'right' });
      }
    });

    this.historyMessages = parseMessagesUser;
  }

  emojiSelect(event: any) {
    this.valueInput = this.valueInput + event.emoji.native;
    this.openEmoji();
  }

  openEmoji() {
    this.isOpenEmoji = !this.isOpenEmoji;
  }
}
