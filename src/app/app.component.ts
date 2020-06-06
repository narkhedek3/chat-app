import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SocketioService } from './socketio.service';

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pg-chat';
  message = '';
  user = '';
  messages = [];
  faPaperPlane = faPaperPlane;

  constructor(private socketioService: SocketioService) {}

  ngOnInit() {
    this.socketioService.setupSocketConnection();
    this.getMessages();
    this.checkForNewMessage();
  }

  sendMessage() {
    if(!this.user)
      return alert('User field is empty');
    this.socketioService.sendMessage({user : this.user, message: this.message});
    this.message = '';
    this.getMessages();
  }

  checkForNewMessage() {
    this.socketioService.socket.on('new message', messages => {
      this.messages = <any>messages;
    });
  }

  getMessages() {
    this.socketioService.getMessages().then(messages => {
      this.messages = <any>messages;
      this.messages;
      window.scrollTo(0,document.body.scrollHeight);
    });
  }

  deleteAllMessages() {
    this.socketioService.deleteAllMessages();
  }

}
