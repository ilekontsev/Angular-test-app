import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { map, mergeMap } from 'rxjs';
import { DialogCreateChatComponent } from 'src/app/dialogs/dialog-create-chat/dialog-create-chat.component';
import { ApiService } from 'src/app/services/api.service';
import { DragDropService } from '../../drag-drop/drag-drop.service';
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
    private _apiService: ApiService,
    private _dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private _dragDropService: DragDropService
  ) {}

  ngOnInit(): void {
    this.subscription();
    this.init();
  }

  subscription() {
    this._chatStateService.valueText.subscribe((res: string) => {
      this.valueInput += res;
    });
    this._dragDropService.fileArr.subscribe((res) => {
      this.fileArr = res;
    });
  }

  init(): void {
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
        this.saveHistoryChat(res);
      });
  }

  saveHistoryChat(messages): void {
    this._chatStateService.historyMessages.next(messages);
  }

  handleSendMessage(): void {
    if (!this.valueInput.trim() && !this.fileArr?.length) {
      return;
    }

    this._chatStateService.addCurrentMessage(
      this.valueInput,
      this.fileArr,
      this._apiService.user
    );
    const chatId = this.chats[this.tabIndex]?.id;

    this._chatService.sendMessage(this.valueInput, chatId);
    this.valueInput = '';
    this._dragDropService.fileArr.next([]);
  }

  deleteAttachFile(file) {
    const fileArr = this.fileArr.filter((item) => item !== file);
    this._dragDropService.fileArr.next(fileArr);
  }

  openDialog(): void {
    this._dialog.open(DialogCreateChatComponent, {
      width: '250px',
    });
  }

  openEmoji(): void {
    this._chatStateService.openEmoji();
  }

  changeTab(event): void {
    this.tabIndex = event.index;
  }

  sanitize(url: any) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
