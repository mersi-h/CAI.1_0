// vendor-directory.component.ts
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';

interface Vendor {
  vendorId: string;
  name: string;
  category: string;
  country: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: string;
}

@Component({
  selector: 'app-vendor-directory',
  templateUrl: './vendor-directory.component.html',
  providers: [MessageService, ConfirmationService]
})
export class VendorDirectoryComponent implements OnInit {
  // Search and Filter fields
  searchString: string = '';
  selectedCategory: any = null;
  selectedCountry: any = null;
  selectedStatus: any = null;

  // Table data
  vendors: Vendor[] = [];
  totalRecords: number = 0;
  loading: boolean = false;

  // Dialog controls
  displayAddEditDialog: boolean = false;
  displayViewDialog: boolean = false;
  isEditMode: boolean = false;
  selectedVendor: Vendor | null = null;

  // Filter options
  categories: any[] = [
    { name: 'Technology', value: 'Technology' },
    { name: 'Construction', value: 'Construction' },
    { name: 'Food', value: 'Food' },
    { name: 'Automotive', value: 'Automotive' },
    { name: 'Services', value: 'Services' }
  ];

  countries: any[] = [
    { name: 'USA', value: 'USA' },
    { name: 'Canada', value: 'Canada' },
    { name: 'UK', value: 'UK' },
    { name: 'Spain', value: 'Spain' },
    { name: 'Germany', value: 'Germany' },
    { name: 'Australia', value: 'Australia' }
  ];

  statuses: any[] = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Pending', value: 'Pending' }
  ];

  constructor(
      private messageService: MessageService,
      private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadVendors();
  }

  loadVendors(event?: any) {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.vendors = [
        {
          vendorId: 'V001',
          name: 'Acme Corp',
          category: 'Technology',
          country: 'USA',
          contactPerson: 'John Smith',
          email: 'john.smith@acme.com',
          phone: '+1-555-1234',
          status: 'Active'
        },
        // ... more vendor data
      ];
      this.totalRecords = this.vendors.length;
      this.loading = false;
    }, 1000);
  }

  addVendor() {
    this.selectedVendor = {
      vendorId: '',
      name: '',
      category: '',
      country: '',
      contactPerson: '',
      email: '',
      phone: '',
      status: 'Pending'
    };
    this.isEditMode = false;
    this.displayAddEditDialog = true;
  }

  editVendor(vendor: Vendor) {
    this.selectedVendor = { ...vendor };
    this.isEditMode = true;
    this.displayAddEditDialog = true;
  }

  viewVendor(vendor: Vendor) {
    this.selectedVendor = vendor;
    this.displayViewDialog = true;
  }

  deleteVendor(vendor: Vendor) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this vendor?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Simulate API call
        this.vendors = this.vendors.filter(v => v.vendorId !== vendor.vendorId);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Vendor deleted successfully'
        });
      }
    });
  }

  saveVendor() {
    if (!this.selectedVendor?.name || !this.selectedVendor?.email) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields'
      });
      return;
    }

    if (this.isEditMode) {
      // Update existing vendor
      const index = this.vendors.findIndex(v => v.vendorId === this.selectedVendor?.vendorId);
      if (index !== -1) {
        this.vendors[index] = { ...this.selectedVendor };
      }
    } else {
      // Add new vendor
      const newVendor = {
        ...this.selectedVendor,
        vendorId: `V${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
      };
      this.vendors.unshift(newVendor);
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Vendor ${this.isEditMode ? 'updated' : 'added'} successfully`
    });
    this.displayAddEditDialog = false;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Inactive':
        return 'status-inactive';
      case 'Pending':
        return 'status-pending';
      default:
        return '';
    }
  }

  applyFilters() {
    this.loadVendors();
  }

  resetFilters() {
    this.searchString = '';
    this.selectedCategory = null;
    this.selectedCountry = null;
    this.selectedStatus = null;
    this.applyFilters();
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
