import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
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
