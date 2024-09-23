import { Component } from '@angular/core';
import { ReportService } from '../../report.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  constructor(private reportService: ReportService) {}

  downloadDonation(): void {
    this.reportService.getDonationReport().subscribe(blob => {
      const fileName = `DonationReport-${Date.now()}.pdf`;

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  }

}
