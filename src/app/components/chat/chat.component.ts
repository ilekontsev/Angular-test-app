import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
  listUsers = [];

  constructor(private _chatService: ChatService) {}

  ngOnInit(): void {
    this._chatService.connectSocket();
  }
}
