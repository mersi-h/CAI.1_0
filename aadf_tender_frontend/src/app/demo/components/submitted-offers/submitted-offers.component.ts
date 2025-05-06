import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface PendingOffer {
  id: number;
  submissionDate: Date;
  vendorName: string;
  tenderId: string;
  tenderTitle: string;
  offerAmount: number;
  proposedDuration: number; // in days
  technicalDetails: string;
  status: 'Draft' | 'Submitted' | 'Under Review';
  lastEdited?: Date;
}
@Component({
  selector: 'app-submitted-offers',
  templateUrl: './submitted-offers.component.html',
  styleUrl: './submitted-offers.component.scss',
  providers: [MessageService, ConfirmationService]

})
export class SubmittedOffersComponent implements OnInit {
  pendingOffers: PendingOffer[] = [];
  selectedOffer: PendingOffer | null = null;
  displayEditDialog: boolean = false;
  offerForm: FormGroup;
  searchText: string = '';

  // Filter options
  tenderOptions: any[] = [];
  selectedTenderId: string | null = null;

  constructor(
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private fb: FormBuilder
  ) {
    this.offerForm = this.fb.group({
      id: [null],
      offerAmount: [null, [Validators.required, Validators.min(0)]],
      proposedDuration: [null, [Validators.required, Validators.min(1)]],
      technicalDetails: [null, Validators.required]
    });
  }

  ngOnInit() {
    // Mock data - in a real app, this would come from a service
    this.pendingOffers = [
      {
        id: 1,
        submissionDate: new Date(2025, 4, 3, 9, 30), // May 3, 2025, 9:30 AM
        vendorName: 'Apex Technology Solutions',
        tenderId: 'AADF-2025-H01',
        tenderTitle: 'Hackathon Organization',
        offerAmount: 39500,
        proposedDuration: 45,
        technicalDetails: 'Full event management with experienced facilitators and online platform.',
        status: 'Submitted',
        lastEdited: new Date(2025, 4, 3, 9, 30)
      },
      {
        id: 2,
        submissionDate: new Date(2025, 4, 2, 14, 15), // May 2, 2025, 2:15 PM
        vendorName: 'Digital Learning Associates',
        tenderId: 'AADF-2025-E02',
        tenderTitle: 'Educational Programs',
        offerAmount: 118500,
        proposedDuration: 180,
        technicalDetails: 'Comprehensive curriculum development with interactive learning modules.',
        status: 'Draft',
        lastEdited: new Date(2025, 4, 3, 8, 45)
      },
      {
        id: 3,
        submissionDate: new Date(2025, 4, 1, 11, 20), // May 1, 2025, 11:20 AM
        vendorName: 'Eco Educational Group',
        tenderId: 'AADF-2025-E02',
        tenderTitle: 'Educational Programs',
        offerAmount: 125000,
        proposedDuration: 210,
        technicalDetails: 'Environment-focused educational programming with field experience components.',
        status: 'Submitted',
        lastEdited: new Date(2025, 4, 2, 16, 30)
      },
      {
        id: 4,
        submissionDate: new Date(2025, 3, 30, 15, 45), // April 30, 2025, 3:45 PM
        vendorName: 'Tourism Development Corp',
        tenderId: 'AADF-2025-T03',
        tenderTitle: 'Tourism Development',
        offerAmount: 215000,
        proposedDuration: 365,
        technicalDetails: 'Regional tourism development with sustainable practices and community involvement.',
        status: 'Submitted',
        lastEdited: new Date(2025, 4, 1, 9, 15)
      },
      {
        id: 5,
        submissionDate: new Date(2025, 3, 29, 10, 10), // April 29, 2025, 10:10 AM
        vendorName: 'Global Event Solutions',
        tenderId: 'AADF-2025-H01',
        tenderTitle: 'Hackathon Organization',
        offerAmount: 41200,
        proposedDuration: 60,
        technicalDetails: 'International hackathon expertise with prize packages and marketing.',
        status: 'Draft',
        lastEdited: new Date(2025, 4, 2, 11, 20)
      }
    ];

    // Generate tender options from the data
    this.extractTenderOptions();
  }

  private extractTenderOptions() {
    const uniqueTenders = new Map();

    this.pendingOffers.forEach(offer => {
      if (!uniqueTenders.has(offer.tenderId)) {
        uniqueTenders.set(offer.tenderId, {
          label: `${offer.tenderId} - ${offer.tenderTitle}`,
          value: offer.tenderId
        });
      }
    });

    this.tenderOptions = [
      { label: 'All Tenders', value: null },
      ...Array.from(uniqueTenders.values())
    ];
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Draft': return 'status-draft';
      case 'Submitted': return 'status-submitted';
      case 'Under Review': return 'status-under-review';
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

  formatLastEdited(date?: Date): string {
    if (!date) return 'N/A';
    return `Last edited: ${this.formatRelativeTime(date)}, ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  }

  editOffer(offer: PendingOffer): void {
    this.selectedOffer = { ...offer };
    this.offerForm.patchValue({
      id: offer.id,
      offerAmount: offer.offerAmount,
      proposedDuration: offer.proposedDuration,
      technicalDetails: offer.technicalDetails
    });
    this.displayEditDialog = true;
  }

  saveOffer(): void {
    if (this.offerForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly.'
      });
      return;
    }

    const formValues = this.offerForm.value;

    // Find and update the offer in our array (in a real app, you'd call a service)
    const index = this.pendingOffers.findIndex(o => o.id === formValues.id);
    if (index !== -1 && this.selectedOffer) {
      this.pendingOffers[index] = {
        ...this.pendingOffers[index],
        offerAmount: formValues.offerAmount,
        proposedDuration: formValues.proposedDuration,
        technicalDetails: formValues.technicalDetails,
        lastEdited: new Date()
      };

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Offer updated successfully'
      });

      this.displayEditDialog = false;
    }
  }

  submitOffer(offer: PendingOffer): void {
    if (offer.status === 'Draft') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to submit this offer? It cannot be edited once the review process begins.',
        header: 'Submit Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          // In a real app, call a service to submit the offer
          const index = this.pendingOffers.findIndex(o => o.id === offer.id);
          if (index !== -1) {
            this.pendingOffers[index].status = 'Submitted';
            this.pendingOffers[index].lastEdited = new Date();

            this.messageService.add({
              severity: 'success',
              summary: 'Offer Submitted',
              detail: `Offer #${offer.id} has been submitted for review`
            });
          }
        }
      });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Already Submitted',
        detail: 'This offer has already been submitted'
      });
    }
  }

  withdrawOffer(offer: PendingOffer): void {
    if (offer.status === 'Submitted') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to withdraw this submitted offer? You can edit it and resubmit later.',
        header: 'Withdraw Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          // In a real app, call a service to withdraw the offer
          const index = this.pendingOffers.findIndex(o => o.id === offer.id);
          if (index !== -1) {
            this.pendingOffers[index].status = 'Draft';
            this.pendingOffers[index].lastEdited = new Date();

            this.messageService.add({
              severity: 'success',
              summary: 'Offer Withdrawn',
              detail: `Offer #${offer.id} has been withdrawn and can now be edited`
            });
          }
        }
      });
    }
  }

  createNewOffer(): void {
    // In a real app, navigate to a create offer page or open a creation dialog
    this.messageService.add({
      severity: 'info',
      summary: 'Create New Offer',
      detail: 'Navigating to create offer form'
    });
  }

  exportData(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Export',
      detail: 'Pending offers export initiated'
    });
  }

  filterOffers(): PendingOffer[] {
    return this.pendingOffers.filter(offer => {
      const matchesSearch = !this.searchText ||
          offer.vendorName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          offer.tenderId.toLowerCase().includes(this.searchText.toLowerCase()) ||
          offer.tenderTitle.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesTender = !this.selectedTenderId || offer.tenderId === this.selectedTenderId;

      return matchesSearch && matchesTender;
    });
  }



}
