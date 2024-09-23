import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [FormsModule, CommonModule, RouterModule],
})
export class ProfileComponent {
  user: any;
  assignment: string = "You currently have no task assigned to you.";

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      (data) => {
        this.user = data.user;
        this.userService.setUser(this.user);
        
        this.getAssignment(this.user.id);

        if(this.user.isAdmin) {
          this.router.navigate(['/admin']);
        }
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

  getAssignment(id: number) {
    this.userService.getAssignment(id).subscribe(
      (response) => {
        if (response) {          
          this.assignment = `You are assigned to do ${response.task} at ${response.Location.name}`;
        }       
      }
    )
  }


}
