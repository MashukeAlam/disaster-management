import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { 
    
  }

  updateAssignment(userId: number, assignedTask: string, locationId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/assignments/${userId}`, { assignedTask, locationId }, { withCredentials: true });
  }

  getAssignments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/assignments`);
  }
}
