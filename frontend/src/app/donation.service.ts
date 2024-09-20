import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { 
    
  }

  getAllMerchants(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/merchants`, { withCredentials: false });
  }

  getTotalDonated(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/totalDonation`, { withCredentials: false });
  }

  addDonation(donation: Partial<any>): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/donation`, donation);
  }
}
