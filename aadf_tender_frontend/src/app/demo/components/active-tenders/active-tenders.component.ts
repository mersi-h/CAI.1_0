// active-tenders.component.ts
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface Tender {
  id: string;
  title: string;
  category: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: string;
  progress: number;
  participants: number;
  description: string;
  requirements: string[];
  documents: Document[];
  keyDates: KeyDate[];
  tags: string[];
  engagement: TenderEngagement;
}

interface Document {
  name: string;
  type: string;
  size: string;
  uploadDate: string;
}

interface KeyDate {
  event: string;
  date: string;
  completed: boolean;
}

interface TenderEngagement {
  views: number;
  applications: number;
  questions: number;
  averageBid: number;
}

@Component({
  selector: 'app-active-tenders',
  templateUrl: './active-tenders.component.html',
  providers: [MessageService],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('60ms', [
            animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ActiveTendersComponent implements OnInit {
  tenders: Tender[] = [];
  selectedTender: Tender | null = null;
  loading: boolean = false;
  displayDetailDialog: boolean = false;
  displayAnalyticsDialog: boolean = false;

  // Filters
  searchTerm: string = '';
  selectedCategory: string = 'all';
  selectedStatus: string = 'all';
  dateRange: Date[] = [];
  budgetRange: number[] = [0, 1000000];

  // Analytics data
  analyticsData: any = {
    participationTrend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Participants',
        data: [65, 72, 80, 81, 90, 95],
        fill: true,
        borderColor: '#4CAF50',
        tension: 0.4,
        backgroundColor: 'rgba(76, 175, 80, 0.2)'
      }]
    },
    budgetDistribution: {
      labels: ['<50K', '50K-100K', '100K-200K', '200K-500K', '>500K'],
      datasets: [{
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          '#FF9800',
          '#2196F3',
          '#4CAF50',
          '#9C27B0',
          '#F44336'
        ]
      }]
    }
  };

  categories = [
    { label: 'All Categories', value: 'all' },
    { label: 'IT & Technology', value: 'it' },
    { label: 'Construction', value: 'construction' },
    { label: 'Services', value: 'services' },
    { label: 'Supplies', value: 'supplies' }
  ];

  statuses = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Open', value: 'open' },
    { label: 'Closing Soon', value: 'closing_soon' },
    { label: 'Under Review', value: 'under_review' }
  ];

  chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  };

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.loadTenders();
  }

  loadTenders() {
    this.loading = true;
    // Simulate API call with creative mock data
    setTimeout(() => {
      this.tenders = [
        {
          id: 'T001',
          title: 'Enterprise IT Infrastructure Upgrade',
          category: 'IT & Technology',
          budget: 500000,
          startDate: '2024-07-01',
          endDate: '2024-08-15',
          status: 'open',
          progress: 45,
          participants: 12,
          description: 'Comprehensive upgrade of enterprise IT infrastructure including servers, networking, and security systems.',
          requirements: [
            'Minimum 5 years experience in enterprise IT',
            'ISO 27001 certification',
            'Local support team',
            '24/7 maintenance capability'
          ],
          documents: [
            { name: 'Technical Specifications', type: 'PDF', size: '2.5 MB', uploadDate: '2024-06-15' },
            { name: 'Service Level Agreement', type: 'DOCX', size: '1.8 MB', uploadDate: '2024-06-15' }
          ],
          keyDates: [
            { event: 'Publication', date: '2024-07-01', completed: true },
            { event: 'Q&A Session', date: '2024-07-15', completed: false },
            { event: 'Submission Deadline', date: '2024-08-15', completed: false }
          ],
          tags: ['IT Infrastructure', 'Network', 'Security', 'Enterprise'],
          engagement: {
            views: 450,
            applications: 12,
            questions: 35,
            averageBid: 485000
          }
        },
        // Add more creative mock data...
      ];
      this.loading = false;
    }, 1000);
  }

  showTenderDetails(tender: Tender) {
    this.selectedTender = tender;
    this.displayDetailDialog = true;
  }

  showAnalytics() {
    this.displayAnalyticsDialog = true;
  }

  getDaysRemaining(endDate: string): number {
    return Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  }

  getProgressColor(progress: number): string {
    if (progress < 30) return '#F44336';
    if (progress < 70) return '#FFA726';
    return '#4CAF50';
  }

  applyFilters() {
    // Implement filter logic
    this.loadTenders();
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.selectedStatus = 'all';
    this.dateRange = [];
    this.budgetRange = [0, 1000000];
    this.loadTenders();
  }

  downloadDocument(doc: Document) {
    this.messageService.add({
      severity: 'info',
      summary: 'Download Started',
      detail: `Downloading ${doc.name}`
    });
  }

  toggleFavorite(tender: Tender, event: Event) {
    event.stopPropagation();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Tender added to favorites'
    });
  }

  exportToExcel() {
    this.messageService.add({
      severity: 'success',
      summary: 'Export Started',
      detail: 'The tender data is being exported to Excel'
    });
  }

  getStatusSeverity(status: string): string {
    const severityMap: { [key: string]: string } = {
      'open': 'success',
      'closing_soon': 'warning',
      'under_review': 'info'
    };
    return severityMap[status] || 'info';
  }
}
