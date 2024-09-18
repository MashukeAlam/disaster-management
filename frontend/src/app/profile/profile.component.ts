import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [FormsModule, CommonModule],
})
export class ProfileComponent {
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      (data) => {
        this.user = data.user;
      },
      (error) => {
        console.error('Not authenticated', error);
      }
    );
  }

  onLogout() {
    this.authService.logout().subscribe(
      (res) => {
        this.router.navigate(['/login']); 
      },
      (error) => {
        console.error('Logout failed', error);
      }
    );
  }
}
