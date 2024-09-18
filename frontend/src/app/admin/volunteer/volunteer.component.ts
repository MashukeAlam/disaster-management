import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './volunteer.component.html',
  styleUrl: './volunteer.component.scss'
})
export class VolunteerComponent implements OnInit {
  users: any[] = [];
  locations: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
      this.fetchUsers();
      this.fetchLocations();
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

}
