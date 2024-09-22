import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssignmentsService } from '../../assignments.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './volunteer.component.html',
  styleUrl: './volunteer.component.scss'
})
export class VolunteerComponent implements OnInit {
  isUserAdmin = false;
  users: any[] = [];
  locations: any[] = [];
  assignments: Map<number, any> = new Map<number, any>();

  constructor(private authService: AuthService, private assignmentService: AssignmentsService, private userService: UserService) {}

  ngOnInit(): void {
      this.fetchUsers();
      this.fetchLocations();
      this.getAssignments();
      this.isUserAdmin = this.userService.getUser().isAdmin;
      
  }

  fetchUsers(): void {
    this.authService.getNonAdminUsers().subscribe(
      (data) => {
        this.users = data;
      }
    )
  }

  fetchLocations(): void {
    this.authService.getLocations().subscribe(
      (data) => {
        this.locations = data;
      }
    )
  }

  updateAssignment(userId: number, assignedTask: string, location: string) {
    this.authService.updateAssignment(userId, assignedTask, parseInt(location)).subscribe(
      (response) => {
        console.log('Assignment updated successfully', response);
      },
      (error) => {
        console.error('Error updating assignment', error);
      }
    );
  }

  getAssignments() {
    this.assignmentService.getAssignments().subscribe(
      (response) => {  
        this.users.forEach((user: any) => {
          this.assignments.set(user.id, {locationId: 1, task: ""});
        });
        response.forEach((assignment: any) => {
          this.assignments.set(assignment.userId, assignment);
        });        
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
