import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {    
    this.authService.isAuthenticated().subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Not authenticated', error);
      }
    );
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log(response['user'].isAdmin);

        if (response['user'].isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/profile']);
        }
        
      },
      (error) => {
        // Display error message if login fails
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
