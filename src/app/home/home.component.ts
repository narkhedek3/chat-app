import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../socketio.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friends = [];
  userId = '';

  constructor(public socketService: SocketioService, public userService: UserService, public router: Router) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if(this.userId) {
      this.socketService.setupSocketConnection(this.userId);
      this.userService.getAllUsers().subscribe((users: any) => {
        this.friends = users;
      });
    }
    else  
      this.router.navigateByUrl('login-register');
  }


  chatBox(friend) {
    this.router.navigateByUrl('home/' + friend.userId);
  }

  logout() {
    localStorage.removeItem('userId');
    this.socketService.socket.disconnect();
    this.router.navigateByUrl('login-register');
  }

}
