import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CrisisService } from '../crisis.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

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

  constructor(private authService: AuthService, private crisisService: CrisisService) {}

  newDonation: Partial<any> = {
    amount: null,
    merchantId: null,
    crisisId: null,
  };

  ngOnInit(): void {
      this.fetchCrises();
      this.fetchCrisesTypes();
      this.fetchLocations();
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


  addDonation() {}


}
