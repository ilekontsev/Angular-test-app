import { Component, OnInit } from '@angular/core';
import { map, mergeMap, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ChatStateService } from '../chat-state.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-footer-chat',
  templateUrl: './footer-chat.component.html',
  styleUrls: ['./footer-chat.component.scss'],
})
export class FooterChatComponent implements OnInit {
  valueInput = '';
  fileArr;
  chats = [];
  tabIndex = 0;
  constructor(
    private _chatService: ChatService,
    private _chatStateService: ChatStateService,
    private _apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this._chatService
      .getChats()
      .pipe(
        map((res) => {
          this.chats = res;
          return res;
        }),
        mergeMap((res: any) =>
          this._chatService.getMessage(res[this.tabIndex].id)
        )
      )
      .subscribe((res) => {
        console.log(res);
        this.saveHistoryChat(res);
      });
  }

  saveHistoryChat(messages) {
    this._chatStateService.historyMessages.next(messages);
  }

  handleSendMessage(): void {
    if (!this.valueInput.trim()) {
      return;
    }

    this._chatStateService.addCurrentMessage(
      this.valueInput,
      this._apiService.user
    );
    const chatId = this.chats[this.tabIndex].id;

    this._chatService.sendMessage(this.valueInput, chatId);
    this.valueInput = '';
  }

  openDialog() {}

  openEmoji() {}

  changeTab(event) {}

  sanitize(url) {}
}
