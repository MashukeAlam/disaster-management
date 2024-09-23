import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/items`);
  }

  purchaseItem(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/purchase`, data);
  }

  spendItem(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/spend`, data);
  }
}
