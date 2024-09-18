import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './volunteer.component.html',
  styleUrl: './volunteer.component.scss'
})
export class VolunteerComponent implements OnInit {
  users: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
      this.fetchUsers();
  }

  fetchUsers(): void {
    this.authService.getNonAdminUsers().subscribe(
      (data) => {
        this.users = data;
      }
    )
  }

}
