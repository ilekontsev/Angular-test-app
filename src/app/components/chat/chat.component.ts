import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { DialogCreateChatComponent } from 'src/app/dialogs/dialog-create-chat/dialog-create-chat.component';
import { ApiService } from 'src/app/services/api.service';
import { DragdropService } from '../drag-drop/drag-drop.service';
import { ChatService } from './chat.service';
import {
  CHATS,
  GLOBAL_USERS,
  messagesUser_1,
  PERSONAL_USERS,
  USER_IVAN,
} from './mock-chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
  valueInput = '';
  chats: any = [];
  currentMessages: any = {};
  historyMessages: any = {};
  isLoaded = false;
  user: any;
  interlocutors: any;
  listUsers: any = [];
  tabIndex = 0;
  fileArr: Observable<any>;
  @ViewChild('messageBox') readonly messageBox: ElementRef;

  constructor(
    private _ref: ChangeDetectorRef,
    private _chatService: ChatService,
    private _dialog: MatDialog,
    private _apiService: ApiService,
    private sanitizer: DomSanitizer,
    private _dragdropService: DragdropService
  ) {}

  ngOnInit(): void {
    this._chatService.connectSocket();
    this.fileArr = this._dragdropService.fileArr;
    this.request();
  }

  request() {
    this._apiService.callApi('me', 'GET').subscribe((reeee) => {
      this.user = reeee;
      this._apiService.callApi('chats', 'GET').subscribe((res) => {
        this.chats = res;
        this._apiService
          .callApi(`messages/${res[this.tabIndex].id}`)
          .subscribe((response) => {
            this.listUsers = [];
            this.parseMessages(response);
            this._ref.detectChanges();
          });
      });
    });

    this.isLoaded = true;
    this._ref.detectChanges();
  }

  addChat() {}

  getChat() {
    return this._apiService.callApi('chats', 'GET');
  }

  // getMessagesChat(){
  //   this._apiService
  //         .callApi(`messages/${res[this.tabIndex].id}`)
  // }

  openDialog() {
    this._dialog.open(DialogCreateChatComponent, {
      width: '250px',
    });
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
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

    this.historyMessages[this.tabIndex] = parseMessagesUser;
  }

  isOpenEmoji = false;

  emojiSelect(event: any) {
    this.valueInput = this.valueInput + event.emoji.native;
    this.openEmoji();
  }

  openEmoji() {
    this.isOpenEmoji = !this.isOpenEmoji;
  }

  changeTab(event: any) {
    if (this.tabIndex === event.index) {
      return;
    }
    this.tabIndex = event.index;
    if (
      !this.currentMessages[this.tabIndex]?.length &&
      !this.historyMessages[this.tabIndex]?.length
    ) {
      this.isLoaded = false;
      this.request();
    } else {
      this.isLoaded = true;
    }
  }
}
