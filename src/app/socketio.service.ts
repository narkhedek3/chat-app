import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;

  constructor(public http: HttpClient) { }

  setupSocketConnection(userId) {
    this.socket = io();
    this.socket.on(userId, message => {
      console.log('Hello...123');
    });
  }

  getFriends(userId) {
    return this.http.get('/api/v1/message/' + userId);
  }

  sendMessage(messageBody) {
    if (this.socket)
      this.socket.emit('msg', messageBody);
  }

  getMessagesByUserIds(user, friend) {
    return new Promise((resolve, reject) => {
      this.http.get<any>('api/v1/messages/' + user + '/' + friend).subscribe(messagesFromUser => {
        this.http.get<any>('api/v1/messages/' + friend + '/' + user).subscribe(messagesFromFriend => {
          const messages = messagesFromFriend.concat(messagesFromUser);
          const sortedMessages = this.sortByDate(messages);
          resolve(sortedMessages);
        })
      });
    });
  }

  sortByDate(messages) {
    for(let i = 0; i < messages.length; i++) {
      for(let j = i + 1; j < messages.length; j++) {
        const d1 = new Date(messages[i].sentAt);
        const d2 = new Date(messages[j].sentAt);
        if(d1 > d2) {
          let temp = messages[i];
          messages[i] = messages[j];
          messages[j] = temp;
        } 
      }
    }
    return messages;
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

  deleteAllMessages() {
   this.http.delete('/api/v1/messages')
    .subscribe(data => {});
  }


}
