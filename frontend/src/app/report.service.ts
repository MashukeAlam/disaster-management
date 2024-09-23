import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  getDonationReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/donationReport`, {responseType: 'blob'});
  }


}
