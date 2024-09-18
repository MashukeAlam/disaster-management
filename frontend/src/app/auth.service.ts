import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { 
    
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {username, password}, {withCredentials: true});
  }

  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout`, { withCredentials: true });
  }

  isAuthenticated(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`, { withCredentials: true });
  }

  getNonAdminUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users`, { withCredentials: true });
  }
}
