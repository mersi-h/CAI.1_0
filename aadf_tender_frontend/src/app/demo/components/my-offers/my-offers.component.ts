import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {NgClass} from "@angular/common";
import {TooltipModule} from "primeng/tooltip";
import {InputTextModule} from "primeng/inputtext";

interface Offer {
  id: number;
  submissionDate: Date;
  vendorName: string;
  tenderId: string;
  tenderTitle: string;
  offerAmount: number;
  matchScore: number;
  status: 'Auto-Selected' | 'Pending Review' | 'Approved' | 'Rejected';
}
@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrl: './my-offers.component.scss',
  providers: [MessageService]

})
export class MyOffersComponent {

  offers: Offer[] = [];
  searchText: string = '';
  selectedStatus: any = null;

  statusOptions = [
    { label: 'All Statuses', value: null },
    { label: 'Auto-Selected', value: 'Auto-Selected' },
    { label: 'Pending Review', value: 'Pending Review' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' }
  ];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // Mock data - in a real app, this would come from a service
    this.offers = [
      {
        id: 1,
        submissionDate: new Date(2025, 4, 3, 10, 23), // May 3, 2025, 10:23 AM
        vendorName: 'Tech Solutions Ltd',
        tenderId: 'AADF-2025-H01',
        tenderTitle: 'Hackathon Organization',
        offerAmount: 42500,
        matchScore: 92,
        status: 'Auto-Selected'
      },
      {
        id: 2,
        submissionDate: new Date(2025, 4, 3, 9, 45), // May 3, 2025, 9:45 AM
        vendorName: 'Digital Creatives Inc',
        tenderId: 'AADF-2025-H01',
        tenderTitle: 'Hackathon Organization',
        offerAmount: 38750,
        matchScore: 87,
        status: 'Pending Review'
      },
      {
        id: 3,
        submissionDate: new Date(2025, 4, 2, 15, 12), // May 2, 2025, 3:12 PM
        vendorName: 'EventPro Services',
        tenderId: 'AADF-2025-H01',
        tenderTitle: 'Hackathon Organization',
        offerAmount: 45000,
        matchScore: 75,
        status: 'Pending Review'
      },
      {
        id: 4,
        submissionDate: new Date(2025, 4, 2, 11, 30), // May 2, 2025, 11:30 AM
        vendorName: 'Eco Educational Group',
        tenderId: 'AADF-2025-E02',
        tenderTitle: 'Educational Programs',
        offerAmount: 125000,
        matchScore: 91,
        status: 'Approved'
      },
      {
        id: 5,
        submissionDate: new Date(2025, 4, 1, 16, 45), // May 1, 2025, 4:45 PM
        vendorName: 'Learning Initiatives Co',
        tenderId: 'AADF-2025-E02',
        tenderTitle: 'Educational Programs',
        offerAmount: 132500,
        matchScore: 78,
        status: 'Rejected'
      },
      {
        id: 6,
        submissionDate: new Date(2025, 3, 30, 14, 15), // April 30, 2025, 2:15 PM
        vendorName: 'Tourism Development Corp',
        tenderId: 'AADF-2025-T03',
        tenderTitle: 'Tourism Development',
        offerAmount: 215000,
        matchScore: 89,
        status: 'Auto-Selected'
      },
      {
        id: 7,
        submissionDate: new Date(2025, 3, 29, 10, 20), // April 29, 2025, 10:20 AM
        vendorName: 'Local Experience Group',
        tenderId: 'AADF-2025-T03',
        tenderTitle: 'Tourism Development',
        offerAmount: 198750,
        matchScore: 76,
        status: 'Pending Review'
      },
      {
        id: 8,
        submissionDate: new Date(2025, 3, 28, 15, 45), // April 28, 2025, 3:45 PM
        vendorName: 'Destination Services',
        tenderId: 'AADF-2025-T03',
        tenderTitle: 'Tourism Development',
        offerAmount: 222500,
        matchScore: 62,
        status: 'Rejected'
      }
    ];
  }

  getScoreClass(score: number): string {
    if (score >= 85) return 'high-score';
    if (score >= 70) return 'medium-score';
    return 'low-score';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Auto-Selected': return 'status-auto-selected';
      case 'Pending Review': return 'status-pending';
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  }

  formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return 'Over a week ago';
  }

  viewOffer(offer: Offer): void {
    this.messageService.add({
      severity: 'info',
      summary: 'View Offer',
      detail: `Viewing offer from ${offer.vendorName} for ${offer.tenderTitle}`
    });
  }

  compareOffers(offer: Offer): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Compare Offers',
      detail: `Comparing offers for ${offer.tenderTitle}`
    });
  }

  exportData(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Export',
      detail: 'Data export initiated'
    });
  }

  filterOffers(): Offer[] {
    return this.offers.filter(offer => {
      const matchesSearch = !this.searchText ||
          offer.vendorName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          offer.tenderId.toLowerCase().includes(this.searchText.toLowerCase()) ||
          offer.tenderTitle.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus = !this.selectedStatus || offer.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

}
