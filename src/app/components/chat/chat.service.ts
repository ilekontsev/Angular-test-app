import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { BehaviorSubject, mergeMap, Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  isDisabledConnect = true;
  private stompClient: any = null;

  constructor(private _apiService: ApiService) {}

  connectSocket() {
    const socket = new SockJS('http://192.168.88.27:8080/api/v1/fierce');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe('/messages', (hello: any) => {
        this.showMessage(JSON.parse(hello.body));
      });
    });
  }

  showMessage(message: any) {
    console.log(message);
  }

  sendMessage(messageText: string, chatId: string): void {
    // if (!this.currentMessages[this.tabIndex]) {
    //   this.currentMessages[this.tabIndex] = [];
    // }

    // this.currentMessages[this.tabIndex].push({
    //   data: this.valueInput,
    //   position: 'right',
    //   user: this.user,
    //   date: new Date(),
    // });

    const message = {
      chatId,
      data: messageText,
      ownerId: this._apiService.user.id,
    };

    this.stompClient.send(`/app/message`, {}, JSON.stringify(message));

    // this.messageBox.nativeElement.scrollTop = 0;

    //url
  }
  getChats() {
    return this._apiService.callApi('chats', 'GET');
  }

  getMessage(chatId: string): Observable<any> {
    return this._apiService.callApi(`messages/${chatId}`, 'GET');
  }
}
