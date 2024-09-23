import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { VolunteerComponent } from './admin/volunteer/volunteer.component';
import { CrisisComponent } from './admin/crisis/crisis.component';
import { ReportComponent } from './admin/report/report.component';
import { InventoryComponent } from './admin/inventory/inventory.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'volunteer',
    component: VolunteerComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'volunteer', component: VolunteerComponent },
      { path: 'inventory', component: InventoryComponent },
    ] 
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'volunteer', component: VolunteerComponent },
      { path: 'crisis', component: CrisisComponent },
      { path: 'report', component: ReportComponent },
      { path: 'inventory', component: InventoryComponent },
    ] 
  }
];
