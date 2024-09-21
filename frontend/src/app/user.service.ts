import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currUser: any;

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { 
    
  }

  setUser(user: any) {    
    this.currUser = user;
  }

  getUser() {
    return this.currUser;
  }

  isAdmin() {    
    return true;
  }

  getTotalVolunteers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/totalVolunteers`, { withCredentials: false });
  }

  addUser(user: Partial<any>): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }
}
