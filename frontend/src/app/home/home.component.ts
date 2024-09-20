import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CrisisService } from '../crisis.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DonationService } from '../donation.service';

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

  constructor(private authService: AuthService, private crisisService: CrisisService, private donationService: DonationService) {}

  newDonation: Partial<any> = {
    amount: null,
    merchantId: null,
    crisisId: null,
  };

  ngOnInit(): void {
      this.fetchCrises();
      this.fetchCrisesTypes();
      this.fetchLocations();
      this.fetchMerchants();
  }

  fetchCrises() {
    this.crisisService.getAllApprovedCrises().subscribe(
      (data) => {
        console.log(data);
        
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
        console.log(data);
        
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

  addDonation() {
    this.donationService.addDonation(this.newDonation).subscribe(
      () => {
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


}
