// generate-reports.component.ts
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';

interface ReportType {
  label: string;
  value: string;
}

interface DateRange {
  label: string;
  value: string;
}

interface Category {
  label: string;
  value: string;
}

interface Status {
  label: string;
  value: string;
}

interface Vendor {
  id: string;
  name: string;
}

interface GeneratedReport {
  reportId: string;
  reportName: string;
  generatedOn: string;
  generatedBy: string;
  format: string;
  status: string;
  errorMessage?: string;
}

@Component({
  selector: 'app-generate-reports',
  templateUrl: './generate-reports.component.html',
  providers: [MessageService, ConfirmationService]
})
export class GenerateReportsComponent implements OnInit {
  // Report Parameters
  reportTypes: ReportType[] = [
    { label: 'Tender Summary', value: 'tender_summary' },
    { label: 'Submission Analysis', value: 'submission_analysis' },
    { label: 'Evaluation Statistics', value: 'evaluation_stats' },
    { label: 'Vendor Performance', value: 'vendor_performance' },
    { label: 'Audit Log', value: 'audit_log' }
  ];
  selectedReportType: ReportType | null = null;

  dateRanges: DateRange[] = [
    { label: 'Last Week', value: 'last_week' },
    { label: 'Last Month', value: 'last_month' },
    { label: 'Last Quarter', value: 'last_quarter' },
    { label: 'Last Year', value: 'last_year' },
    { label: 'Custom Range', value: 'custom_range' }
  ];
  selectedDateRange: DateRange | null = null;
  customStartDate: Date | null = null;
  customEndDate: Date | null = null;

  categories: Category[] = [
    { label: 'Goods', value: 'goods' },
    { label: 'Services', value: 'services' },
    { label: 'Works', value: 'works' }
  ];
  selectedCategory: Category | null = null;

  statuses: Status[] = [
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' }
  ];
  selectedStatus: Status | null = null;

  // Vendors
  vendors: Vendor[] = [
    { id: '1', name: 'Vendor A' },
    { id: '2', name: 'Vendor B' },
    { id: '3', name: 'Vendor C' }
  ];
  selectedVendor: Vendor | null = null;
  filteredVendors: Vendor[] = [];

  // Generated Reports
  generatedReports: GeneratedReport[] = [];
  totalRecords: number = 0;
  currentPage: number = 0;
  rowsPerPage: number = 10;

  // Dialog controls
  displayViewDialog: boolean = false;
  selectedReport: GeneratedReport | null = null;
  reportLoading: boolean = false;

  constructor(
      private messageService: MessageService,
      private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadGeneratedReports();
  }

  filterVendors(event: { query: string }) {
    this.filteredVendors = this.vendors.filter(vendor =>
        vendor.name.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  generateReport() {
    if (!this.selectedReportType || !this.selectedDateRange) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please select Report Type and Date Range'
      });
      return;
    }

    this.reportLoading = true;
    // Simulate API call
    setTimeout(() => {
      const newReport: GeneratedReport = {
        reportId: Date.now().toString(),
        reportName: `${this.selectedReportType?.label} - ${this.selectedDateRange?.label}`,
        generatedOn: new Date().toLocaleString(),
        generatedBy: 'Current User',
        format: 'PDF',
        status: 'Success'
      };
      this.generatedReports.unshift(newReport);
      this.totalRecords++;
      this.reportLoading = false;

      this.messageService.add({
        severity: 'success',
        summary: 'Report Generated',
        detail: 'Your report has been generated successfully'
      });
    }, 2000);
  }

  saveConfig() {
    this.messageService.add({
      severity: 'success',
      summary: 'Configuration Saved',
      detail: 'Report configuration has been saved'
    });
  }

  loadGeneratedReports() {
    // Simulate API call
    this.generatedReports = [
      {
        reportId: '1',
        reportName: 'Tender Summary - Last Month',
        generatedOn: '2024-07-28 10:30 AM',
        generatedBy: 'John Doe',
        format: 'PDF',
        status: 'Success'
      },
      {
        reportId: '2',
        reportName: 'Vendor Performance - Last Year',
        generatedOn: '2024-07-25 03:15 PM',
        generatedBy: 'Jane Smith',
        format: 'CSV',
        status: 'Success'
      },
      {
        reportId: '3',
        reportName: 'Evaluation Statistics - Last Quarter',
        generatedOn: '2024-07-20 09:00 AM',
        generatedBy: 'John Doe',
        format: 'Excel',
        status: 'Failed',
        errorMessage: 'Data processing error'
      }
    ];
    this.totalRecords = this.generatedReports.length;
  }

  viewReport(report: GeneratedReport) {
    this.selectedReport = report;
    this.displayViewDialog = true;
  }

  downloadReport(report: GeneratedReport) {
    this.messageService.add({
      severity: 'info',
      summary: 'Download Started',
      detail: `Downloading ${report.reportName}`
    });
  }

  deleteReport(report: GeneratedReport) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this report?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.generatedReports = this.generatedReports.filter(r => r.reportId !== report.reportId);
        this.totalRecords--;
        this.messageService.add({
          severity: 'success',
          summary: 'Report Deleted',
          detail: 'Report has been deleted successfully'
        });
      }
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    // Here you would typically load the data for the new page
    // this.loadGeneratedReports(event.page, event.rows);
  }
}
