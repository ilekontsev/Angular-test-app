import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  isOpenEmoji$ = this._chatStateService.isOpenEmoji;
  user = this._apiService.user;
  isEditMessage = false;
  message: any = {};
  position = 0;

  @ViewChild('messageBox') readonly messageBox: ElementRef;
  @ViewChild('messageContainer') readonly messageContainer: ElementRef;

  constructor(
    private _apiService: ApiService,
    private _chatStateService: ChatStateService,
    private _chatService: ChatService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.subscription();
  }

  subscription(): void {
    this._chatStateService.historyMessages.subscribe((res) => {
      this.historyMessages = this._chatService.parseHistoryMessages(res);
    });
    this._chatStateService.currentMessages.subscribe((res) => {
      this.currentMessages = res;
      this.messageBox.nativeElement.scrollTop = 0;
    });
  }

  emojiSelect(event: any): void {
    if (this.isEditMessage) {
      this.message.data =
        this.message.data.substr(0, this.position) +
        event.emoji.native +
        this.message.data.substr(this.position);
    } else {
      this._chatStateService.valueText.next(event.emoji.native);
    }
    this._chatStateService.openEmoji();
  }

  sanitize(url: any) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  handleDisableEdit(event?) {
    const position = document.getSelection().anchorOffset - 1;
    this.position = position > 0 ? position : 0;
    if (!event) {
      return;
    }

    if (event.keyCode == 13) {
      this.isEditMessage = false;
      this.position = 0;
      this.message.data = this.message.data.replace(/\r?\n/g, '');
    }
  }

  repeatMessage(message) {}

  editMessage(message) {
    this.message = message;
    this.isEditMessage = !this.isEditMessage;
  }

  deleteMessage(message) {
    this._chatStateService.deleteCurrentMessage(message);
  }
}
