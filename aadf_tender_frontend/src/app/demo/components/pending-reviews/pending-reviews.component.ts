// pending.component.ts
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface PendingItem {
  id: string;
  type: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
  progress: number;
  assignedTo: string;
  description: string;
  category: string;
  tags: string[];
}

@Component({
  selector: 'app-pending',
  templateUrl: './pending-reviews.component.html',
  providers: [MessageService, ConfirmationService],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-out',
            style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('tableRowAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger('50ms', [
            animate('0.3s ease-out',
                style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class PendingReviewsComponent implements OnInit {

  pendingItems: PendingItem[] = [];
  selectedItem: PendingItem | null = null;
  displayDialog: boolean = false;
  loading: boolean = false;
  selectedCategory: string = 'all';
  searchTerm: string = '';

  categories = [
    { label: 'All', value: 'all' },
    { label: 'Approvals', value: 'approvals' },
    { label: 'Reviews', value: 'reviews' },
    { label: 'Documents', value: 'documents' }
  ];

  priorities = [
    { label: 'High', value: 'high', icon: 'pi pi-exclamation-triangle', color: '#ef4444' },
    { label: 'Medium', value: 'medium', icon: 'pi pi-flag', color: '#f59e0b' },
    { label: 'Low', value: 'low', icon: 'pi pi-info-circle', color: '#3b82f6' }
  ];

  constructor(
      private messageService: MessageService,
      private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadPendingItems();
  }

  loadPendingItems() {
    this.loading = true;
    // Simulate API call with creative mock data
    setTimeout(() => {
      this.pendingItems = [
        {
          id: 'PEN001',
          type: 'Approval',
          title: 'Project Budget Review',
          status: 'pending',
          priority: 'high',
          dueDate: '2024-08-01',
          progress: 65,
          assignedTo: 'John Smith',
          description: 'Annual budget review for Project Alpha needs approval',
          category: 'approvals',
          tags: ['Budget', 'Finance', 'Annual']
        },
        {
          id: 'PEN002',
          type: 'Review',
          title: 'Technical Specification',
          status: 'in_progress',
          priority: 'medium',
          dueDate: '2024-07-28',
          progress: 30,
          assignedTo: 'Sarah Johnson',
          description: 'Review technical specifications for new system',
          category: 'reviews',
          tags: ['Technical', 'Documentation']
        },
        {
          id: 'PEN003',
          type: 'Document',
          title: 'Legal Contract',
          status: 'pending',
          priority: 'high',
          dueDate: '2024-07-25',
          progress: 80,
          assignedTo: 'Mike Wilson',
          description: 'Review and sign vendor agreement',
          category: 'documents',
          tags: ['Legal', 'Contract']
        }
        // Add more creative mock data as needed
      ];
      this.loading = false;
    }, 1000);
  }

  showDetails(item: PendingItem) {
    this.selectedItem = { ...item };
    this.displayDialog = true;
  }

  approve(item: PendingItem) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to approve this item?',
      header: 'Approve Confirmation',
      icon: 'pi pi-check-circle',
      accept: () => {
        // Simulate API call
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Approved',
            detail: `${item.title} has been approved`
          });
          this.loadPendingItems();
        }, 500);
      }
    });
  }

  reject(item: PendingItem) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to reject this item?',
      header: 'Reject Confirmation',
      icon: 'pi pi-times-circle',
      accept: () => {
        // Simulate API call
        setTimeout(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Rejected',
            detail: `${item.title} has been rejected`
          });
          this.loadPendingItems();
        }, 500);
      }
    });
  }

  getPriorityIcon(priority: string): string {
    return this.priorities.find(p => p.value === priority)?.icon || 'pi pi-info-circle';
  }

  getPriorityColor(priority: string): string {
    return this.priorities.find(p => p.value === priority)?.color || '#000000';
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.loadPendingItems();
  }

  getDaysRemaining(dueDate: string): number {
    const remaining = Math.ceil(
        (new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return remaining;
  }
}
