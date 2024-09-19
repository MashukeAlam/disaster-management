import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currUser: any;

  setUser(user: any) {    
    this.currUser = user;
  }

  getUser() {
    return this.currUser;
  }

  isAdmin() {    
    return true;
  }
}
