import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;

  constructor(public http: HttpClient) { }

  setupSocketConnection() {
    this.socket = io();
  }

  sendMessage(messageBody) {
    if (this.socket)
      this.socket.emit('msg', messageBody);
  }

  

  getMessages() {
    return new Promise((resolve, reject) => {
      this.http.get<any>('api/v1/messages')
        .subscribe(data => {
          const { messages } = data;
          resolve(messages);
        });
    });
  }


}
