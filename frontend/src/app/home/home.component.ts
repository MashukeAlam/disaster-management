import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CrisisService } from '../crisis.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DonationService } from '../donation.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  approvedCrises: any[] = [];
  merchants: any[] = [];
  locations: any[] = [];
  crisisTypes: any[] = [];
  totalDonated: number = 0;
  totalVolunteers: number = 0;
  crises: any[] = [];

  newCrisis: Partial<any> = {
    locationId: null,
    crisisTypeId: null,
    isApproved: false,
    severity: null
  };

  constructor(private authService: AuthService,
     private crisisService: CrisisService,
     private donationService: DonationService, 
     private userService: UserService,
     private router: Router) {}

  newDonation: Partial<any> = {
    amount: null,
    merchantId: null,
    crisisId: null,
  };

  newUser: Partial<any> = {
    username: null,
    email: null,
    password: null,
  };

  loginData: any = {
    username: '',
    password: '',
  };

  ngOnInit(): void {
      this.fetchCrises();
      this.fetchCrisesTypes();
      this.fetchLocations();
      this.fetchMerchants();
      this.fetchTotal();
      this.fetchTotalVolunteers();
  }

  fetchCrises() {
    this.crisisService.getAllApprovedCrises().subscribe(
      (data) => {
        
        this.approvedCrises = data;
      },
      (error) => {
        console.error('Error loading crises:', error);
      }
    );
  }

  fetchCrisesTypes() {
    this.crisisService.getAllCrisisTypes().subscribe(
      (data) => {
        this.crisisTypes = data;
        
      },
      (error) => {
        console.error('Error loading crises:', error);
      }
    );
  }

  fetchLocations(): void {
    this.authService.getLocations().subscribe(
      (data) => {
        this.locations = data;
      }
    )
  }

  fetchMerchants(): void {
    this.donationService.getAllMerchants().subscribe(
      (data) => {
        this.merchants = data;
      }
    )
  }

  fetchTotal(): void {
    this.donationService.getTotalDonated().subscribe(
      (data) => {
        
        this.totalDonated = data.amount;
      }
    )
  }

  fetchTotalVolunteers(): void {
    this.userService.getTotalVolunteers().subscribe(
      (data) => {
        
        this.totalVolunteers = data;
      }
    )
  }

  addDonation() {
    this.donationService.addDonation(this.newDonation).subscribe(
      () => {
        this.fetchTotal();
        this.newDonation = {
          amount: null,
          merchantId: null,
          crisisId: null,
        }
      },
      (error) => {
        console.error('Error adding crisis:', error);
      }
    );
  }

  addUser() {
    this.userService.addUser(this.newUser).subscribe(
      (data) => {
        this.newUser = {
          username: null,
          email: null,
          password: null,
        };
        this.fetchTotalVolunteers();
      }
    )
  }

  loginUser() {
    const { username, password } = this.loginData;

    this.authService.login(username, password).subscribe(
      (response) => {
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }

  addCrisis() {
    this.crisisService.addCrisis(this.newCrisis).subscribe(
      () => {
        this.fetchCrises(); 
        this.newCrisis = { locationId: null, crisisTypeId: null, isApproved: false, severity: null };
      },
      (error) => {
        console.error('Error adding crisis:', error);
      }
    );
  }


}
