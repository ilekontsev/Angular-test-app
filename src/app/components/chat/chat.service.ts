import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}

  isDisabledConnect = true;

  private stompClient: any = null;

  connectSocket() {
    const socket = new SockJS('http://192.168.88.27:8080/api/v1/socket');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe('/topic/test', (hello: any) => {
        this.showMessage(JSON.parse(hello.body));
      });
    });
  }

  showMessage(message: any) {}

  sendMessage(message: any) {
    this.stompClient.send('/app/test', {}, JSON.stringify(message));
  }
}
