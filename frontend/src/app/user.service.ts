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
    localStorage.setItem('currUser', JSON.stringify(user));
  }

  getUser() {
    const storedUser = localStorage.getItem('currUser');
    return storedUser ? JSON.parse(storedUser) : undefined;
  }

  isAdmin() {
    const user = this.getUser();
    return user?.isAdmin;
  }

  getTotalVolunteers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/totalVolunteers`, { withCredentials: false });
  }

  getAssignment(id: any): Observable<any> {    
    return this.http.get<any>(`${this.baseUrl}/assignments/${id}`, {withCredentials: false});
  }

  addUser(user: Partial<any>): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }
}
