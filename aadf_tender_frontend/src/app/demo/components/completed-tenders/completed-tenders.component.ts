import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {Tender} from "../../../model/Tender";

@Component({
  selector: 'app-completed-tenders',
  templateUrl: './completed-tenders.component.html',
  styleUrls: ['./completed-tenders.component.scss']
})
export class CompletedTendersComponent implements OnInit {
  completedTenders: any[] = [];
  tenderSteps: MenuItem[] = [
    { label: 'Published' },
    { label: 'Proposals' },
    { label: 'Evaluation' },
    { label: 'Awarded' },
    { label: 'Completed' }
  ];

  selectedTender: any = null;
  showTenderDetail: boolean = false;

  // Filters
  selectedYear: number = new Date().getFullYear();
  selectedCategory: string | null = null;

  challengeAreas: any[] = [
    {name: 'Education Accessibility'},
    {name: 'Tourism Development'},
    {name: 'Digital Public Services'},
    {name: 'Cultural Heritage Preservation'}
  ];

  years: number[] = [];

  constructor() {
    // Generate last 5 years for the filter
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 5; i++) {
      this.years.push(currentYear - i);
    }
  }

  ngOnInit(): void {
    this.loadCompletedTenders();
  }

  loadCompletedTenders(): void {
    // In a real app, this would be an API call
    this.completedTenders = [
      {
        subject: 'Albania ',
        area: 'Tourism',
        startedDate:  new Date('2023-02-15'),
        finishedDate:  new Date('2023-02-15'),
        status: 'Completed',
        vendorWinner: 'DigiTech Solutions Albania',
        winningBid: '€85,000',
      },
      {
        subject: ' Tourism Digital ',
        area: 'Tourism',
        startedDate:  new Date('2023-02-15'),
        finishedDate:  new Date('2023-02-15'),
        status: 'Completed',
        vendorWinner: 'DigiTech Solutions Albania',
        winningBid: '€85,000',
      },
      {
        subject: ' Platform',
        area: 'Tourism',
        startedDate:  new Date('2023-02-15'),
        finishedDate:  new Date('2023-02-15'),
        status: 'Completed',
        vendorWinner: 'DigiTech Solutions Albania',
        winningBid: '€85,000',
      },
    ];
  }

  filterTenders(): void {
    // Would typically make a filtered API call here
    console.log(`Filtering by: Year=${this.selectedYear}, Category=${this.selectedCategory}`);
    // Simulate filter operation
    this.loadCompletedTenders();
  }

  viewTenderDetails(tender: any): void {
    this.selectedTender = tender;
    this.showTenderDetail = true;
  }

  exportTenderReport(tenderId: string): void {
    console.log(`Exporting report for tender ${tenderId}`);
    // In a real app, this would generate and download a PDF report
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
