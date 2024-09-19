import { Component, OnInit } from '@angular/core';
import { CrisisService } from '../../crisis.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-crisis',
  templateUrl: './crisis.component.html',
  styleUrls: ['./crisis.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CrisisComponent implements OnInit {
  crises: any[] = [];
  crisisTypes: any[] = [];
  locations: any[] = [];

  newCrisis: Partial<any> = {
    locationId: null,
    crisisTypeId: null,
    isApproved: false,
    severity: null
  };

  constructor(private crisisService: CrisisService, private authService: AuthService) {}

  ngOnInit() {
    this.fetchCrises();
    this.fetchCrisesTypes();
    this.fetchLocations();
  }

  fetchCrises() {
    this.crisisService.getAllCrises().subscribe(
      (data) => {
        this.crises = data;
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

  openModal() {
    const modal = document.getElementById('addCrisisModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('addCrisisModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
