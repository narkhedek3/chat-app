import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  login(userDetails) {
    return this.http.post('/api/v1/user/login',userDetails);
  }

  register(userDetails) {
    return this.http.post('/api/v1/user/register',userDetails);
  }

  logout() {
    localStorage.removeItem('userId');
    window.location.reload();
  }

  getAllUsers() {
    return this.http.get('/api/v1/user/', { });
  }

}
