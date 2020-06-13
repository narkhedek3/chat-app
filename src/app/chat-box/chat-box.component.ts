import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { SocketioService } from '../socketio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, AfterViewChecked {

  message = '';
  friend = '';
  user = '';
  messages = [];

  constructor(private socketioService: SocketioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.user = localStorage.getItem('userId');
    if (!this.user)
      return this.router.navigateByUrl('login-register');

    const { userId } = this.route.snapshot.params;
    this.friend = userId;
    this.getOldMessages();
    this.checkForNewMessage();
  }

  ngAfterViewChecked() {
    // to scroll down  after new message added
    window.scrollTo(0, 500000);
  }

  sendMessage() {
    const newMessage = { from: this.user, to: this.friend, message: this.message };
    this.socketioService.sendMessage(newMessage);
    this.messages.push(newMessage);
    this.message = '';
  }

  checkForNewMessage() {
    this.socketioService.socket.on(this.user, message => {
      console.log(message);
      if (this.friend == message.from) {
        this.messages.push(message);
      }

    });
  }

  getOldMessages() {
    this.socketioService.getMessagesByUserIds(this.user, this.friend).then(messages => {
      this.messages = <any>messages;
    });
  }

}
