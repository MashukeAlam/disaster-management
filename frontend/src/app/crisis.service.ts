import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrisisService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { 
    
  }

  getAllCrises(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/crises`, { withCredentials: false });
  }

  getAllCrisisTypes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/crisisTypes`, { withCredentials: false });
  }

  addCrisis(crisis: Partial<any>): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/crises`, crisis);
  }
}
