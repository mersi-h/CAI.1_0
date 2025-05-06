// submissions.component.ts
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

interface Submission {
  submissionId: string;
  tenderId: string;
  vendorName: string;
  submissionDate: string;
  status: string;
  evaluationProgress: number;
}

interface Filter {
  key: string;
  label: string;
  value: any;
}

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  providers: [MessageService]
})
export class SubmissionsComponent implements OnInit {
  // Search and filters
  searchString: string = '';
  selectedTender: any = null;
  selectedVendor: any = null;
  selectedSubmissionDate: Date | null = null;
  activeFilters: Filter[] = [];

  // Data
  submissions: Submission[] = [];
  totalSubmissions: number = 0;
  averageSubmissionTime: string = '';
  totalRecords: number = 0;
  loading: boolean = false;

  // Dialog control
  displayViewDialog: boolean = false;
  selectedSubmission: Submission | null = null;

  // Dropdown options
  tenders: any[] = [
    { tenderId: 'T001', name: 'Tender for IT Equipment' },
    { tenderId: 'T002', name: 'Tender for Construction Services' },
    { tenderId: 'T003', name: 'Tender for Food Supply' }
  ];

  vendors: any[] = [
    { name: 'Acme Corp', vendorId: 'V001' },
    { name: 'Beta Inc', vendorId: 'V002' },
    { name: 'Gamma Ltd', vendorId: 'V003' },
    { name: 'Delta SA', vendorId: 'V004' },
    { name: 'Epsilon GmbH', vendorId: 'V005' },
    { name: 'Zeta Co', vendorId: 'V006' }
  ];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.loadSubmissions();
    this.calculateStatistics();
  }

  loadSubmissions() {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.submissions = [
        {
          submissionId: 'S001',
          tenderId: 'T001',
          vendorName: 'Acme Corp',
          submissionDate: '2024-07-20',
          status: 'Received',
          evaluationProgress: 25
        },
        {
          submissionId: 'S002',
          tenderId: 'T001',
          vendorName: 'Beta Inc',
          submissionDate: '2024-07-21',
          status: 'Under Review',
          evaluationProgress: 50
        },
        // Add more mock data...
      ];
      this.totalRecords = this.submissions.length;
      this.loading = false;
    }, 1000);
  }

  calculateStatistics() {
    this.totalSubmissions = this.submissions.length;
    this.averageSubmissionTime = '2.5 days';
  }

  applyFilters() {
    this.activeFilters = [];

    if (this.searchString) {
      this.activeFilters.push({
        key: 'search',
        label: 'Search',
        value: this.searchString
      });
    }

    if (this.selectedTender) {
      this.activeFilters.push({
        key: 'tender',
        label: 'Tender',
        value: this.selectedTender.name
      });
    }

    if (this.selectedVendor) {
      this.activeFilters.push({
        key: 'vendor',
        label: 'Vendor',
        value: this.selectedVendor.name
      });
    }

    if (this.selectedSubmissionDate) {
      this.activeFilters.push({
        key: 'date',
        label: 'Submission Date',
        value: this.selectedSubmissionDate.toLocaleDateString()
      });
    }

    this.loadSubmissions(); // Reload with filters
  }

  removeFilter(filter: Filter) {
    switch (filter.key) {
      case 'search':
        this.searchString = '';
        break;
      case 'tender':
        this.selectedTender = null;
        break;
      case 'vendor':
        this.selectedVendor = null;
        break;
      case 'date':
        this.selectedSubmissionDate = null;
        break;
    }
    this.activeFilters = this.activeFilters.filter(f => f.key !== filter.key);
    this.applyFilters();
  }

  clearFilters() {
    this.searchString = '';
    this.selectedTender = null;
    this.selectedVendor = null;
    this.selectedSubmissionDate = null;
    this.activeFilters = [];
    this.loadSubmissions();
  }

  getStatusColor(status: string): string {
    const colorMap: { [key: string]: string } = {
      'Received': 'info',
      'Under Review': 'warning',
      'Accepted': 'success',
      'Rejected': 'danger'
    };
    return colorMap[status] || 'info';
  }

  viewSubmission(submission: Submission) {
    this.selectedSubmission = submission;
    this.displayViewDialog = true;
  }

  onPageChange(event: any) {
    // Handle pagination
    this.loadSubmissions();
  }
}
