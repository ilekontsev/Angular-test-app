import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  valueInput = '';
  messages: any = [];
  constructor() {}

  ngOnInit(): void {}

  handleSendMessage(event?: KeyboardEvent) {
    if (!this.valueInput.trim()) {
      return;
    }
    if (event && event.code !== 'Enter') {
      return;
    }
    this.messages.push({ message: this.valueInput });
    //url
    this.valueInput = '';
  }
}
