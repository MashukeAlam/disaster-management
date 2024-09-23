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
    return this.http.get(`${this.baseUrl}/donationReport`, {responseType: 'blob', withCredentials: true});
  }

  getExpenseReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/expenseReport`, {responseType: 'blob', withCredentials: true});
  }

  getInventoryReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/inventoryReport`, {responseType: 'blob', withCredentials: true});
  }


}
