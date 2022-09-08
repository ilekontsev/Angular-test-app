import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateChatComponent } from 'src/app/dialogs/dialog-create-chat/dialog-create-chat.component';
import { ApiService } from 'src/app/services/api.service';
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

  @ViewChild('messageBox') readonly messageBox: ElementRef;

  constructor(
    private _ref: ChangeDetectorRef,
    private _chatService: ChatService,
    private _dialog: MatDialog,
    private _apiService: ApiService
  ) {}

  ngOnInit(): void {
    this._chatService.connectSocket();
    this.request();
  }

  request() {
    setTimeout(() => {
      this.user = USER_IVAN;
      this._apiService.callApi('chats', 'GET').subscribe((res) => {
        this.chats = JSON.parse(res.chats);
        this._ref.detectChanges();
      });
      switch (this.tabIndex) {
        case 1:
          this.listUsers = PERSONAL_USERS;
          this.parseMessages(messagesUser_1);
          break;
        case 0:
          this.listUsers = GLOBAL_USERS;
          this.parseMessages([]);
          break;
        default:
          this.listUsers = [];
          this.parseMessages([]);
          break;
      }
      this.isLoaded = true;
      this._ref.detectChanges();
    }, 1000);
  }

  addChat() {}

  openDialog() {
    this._dialog.open(DialogCreateChatComponent, {
      width: '250px',
    });
  }

  parseMessages(messages: any[]) {
    if (!messages.length) {
      this.historyMessages[this.tabIndex] = [];
      this.currentMessages[this.tabIndex] = [];
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

  handleSendMessage(event?: KeyboardEvent) {
    if (!this.valueInput.trim()) {
      return;
    }
    if (event && event.code !== 'Enter') {
      return;
    }
    if (!this.currentMessages[this.tabIndex]) {
      this.currentMessages[this.tabIndex] = [];
    }

    this.currentMessages[this.tabIndex].push({
      message: this.valueInput,
      position: 'right',
      ...USER_IVAN,
      date: new Date(),
    });

    this.messageBox.nativeElement.scrollTop = 0;

    //url
    this.valueInput = '';
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
