import {Component, OnInit} from '@angular/core';
import {AuditLog} from "../../../model/audit-log";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime} from "rxjs";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-audit-log',
    standalone: true,
    imports: [
        NgClass,
        DatePipe,
        ReactiveFormsModule,
        NgForOf,
        NgIf
    ],
    templateUrl: './audit-log.component.html',
    styleUrl: './audit-log.component.scss'
})
export class AuditLogComponent implements OnInit {
    auditLogs: AuditLog[] = [];
    filteredLogs: AuditLog[] = [];
    filterForm: FormGroup;

    users: string[] = [];
    actions: string[] = [];
    timePeriods = [
        {value: 7, label: 'Last 7 days'},
        {value: 30, label: 'Last 30 days'},
        {value: 90, label: 'Last 90 days'},
        {value: 365, label: 'Last year'},
        {value: 0, label: 'All time'}
    ];

    currentPage = 1;
    pageSize = 8;
    totalItems = 0;

    constructor(private fb: FormBuilder) {
        this.filterForm = this.fb.group({
            username: [''],
            action: [''],
            timePeriod: [30]
        });
    }

    ngOnInit(): void {
        this.loadAuditLogs();

        // Extract unique users and actions for filter dropdowns
        this.users = [...new Set(this.auditLogs.map(log => log.username))];
        this.actions = [...new Set(this.auditLogs.map(log => log.action))];

        // Apply filters when form values change
        this.filterForm.valueChanges
            .pipe(debounceTime(300))
            .subscribe(() => {
                this.applyFilters();
            });

        this.applyFilters(); // Apply initial filters
    }

    loadAuditLogs(): void {
        // In a real application, this would be an API call
        this.auditLogs = [
            {
                id: 1,
                username: 'sarah.johnson',
                action: 'Created',
                details: 'Created new tender AADF-2025-H01 for Hackathon Organization',
                tenderId: 'AADF-2025-H01',
                eventTime: new Date('2025-05-01T09:23:00'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                username: 'michael.davis',
                action: 'Reviewed',
                details: 'Reviewed submission #3 for AADF-2025-H01',
                tenderId: 'AADF-2025-H01',
                notes: 'Budget needs revision',
                eventTime: new Date('2025-05-02T11:42:00'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3,
                username: 'admin.user',
                action: 'Deleted',
                details: 'Deleted draft document "AADF-2025-E02 Financial Requirements"',
                tenderId: 'AADF-2025-E02',
                eventTime: new Date('2025-05-02T14:05:00'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 4,
                username: 'jennifer.smith',
                action: 'Updated',
                details: 'Updated submission deadline for AADF-2025-T03 to June 30, 2025',
                tenderId: 'AADF-2025-T03',
                eventTime: new Date('2025-05-03T08:17:00'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 5,
                username: 'robert.wilson',
                action: 'Reviewed',
                details: 'Approved Tourism Development plan for AADF-2025-T03',
                tenderId: 'AADF-2025-T03',
                notes: 'Great proposal',
                eventTime: new Date('2025-05-03T10:33:00'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 6,
                username: 'sarah.johnson',
                action: 'Created',
                details: 'Created new tender AADF-2025-E02 for Educational Programs',
                tenderId: 'AADF-2025-E02',
                eventTime: new Date('2025-05-03T13:45:00'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 7,
                username: 'david.thompson',
                action: 'Updated',
                details: 'Modified financial requirements for AADF-2025-H01',
                tenderId: 'AADF-2025-H01',
                notes: 'Added budget template',
                eventTime: new Date('2025-05-03T15:20:00'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 8,
                username: 'emily.chen',
                action: 'Reviewed',
                details: 'Reviewed 5 submissions for AADF-2025-E02',
                tenderId: 'AADF-2025-E02',
                notes: 'All submissions look promising',
                eventTime: new Date('2025-05-03T16:07:00'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            // Add more logs for pagination demo
            ...Array.from({length: 30}, (_, i) => this.generateMockLog(i + 9))
        ];
    }

    generateMockLog(id: number): AuditLog {
        const usernames = ['sarah.johnson', 'michael.davis', 'admin.user', 'jennifer.smith', 'robert.wilson', 'david.thompson', 'emily.chen'];
        const actions: AuditLog['action'][] = ['Created', 'Updated', 'Reviewed', 'Deleted', 'Approved', 'Rejected'];
        const tenderIds = ['AADF-2025-H01', 'AADF-2025-E02', 'AADF-2025-T03'];

        const username = usernames[Math.floor(Math.random() * usernames.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const tenderId = tenderIds[Math.floor(Math.random() * tenderIds.length)];

        // Random date within the last 90 days
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 90));

        return {
            id,
            username,
            action,
            details: `${action} document for ${tenderId}`,
            tenderId,
            eventTime: date,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }

    applyFilters(): void {
        const {username, action, timePeriod} = this.filterForm.value;

        let filtered = [...this.auditLogs];

        // Filter by username
        if (username) {
            filtered = filtered.filter(log => log.username === username);
        }

        // Filter by action
        if (action) {
            filtered = filtered.filter(log => log.action === action);
        }

        // Filter by time period
        if (timePeriod > 0) {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - timePeriod);
            filtered = filtered.filter(log => log.eventTime >= cutoffDate);
        }

        // Update filtered logs and pagination
        this.totalItems = filtered.length;
        this.filteredLogs = this.paginateResults(filtered);
    }

    paginateResults(logs: AuditLog[]): AuditLog[] {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return logs.slice(startIndex, endIndex);
    }

    goToPage(page: number): void {
        if (page < 1 || page > this.getTotalPages()) return;

        this.currentPage = page;
        this.applyFilters();
    }

    getTotalPages(): number {
        return Math.ceil(this.totalItems / this.pageSize);
    }

    getPageNumbers(): number[] {
        const totalPages = this.getTotalPages();
        if (totalPages <= 5) {
            return Array.from({length: totalPages}, (_, i) => i + 1);
        }

        // Show 5 pages around current page
        if (this.currentPage <= 3) {
            return [1, 2, 3, 4, 5];
        } else if (this.currentPage >= totalPages - 2) {
            return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
            return [this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2];
        }
    }

    getActionClass(action: string): string {
        switch (action) {
            case 'Created':
                return 'created';
            case 'Updated':
                return 'updated';
            case 'Reviewed':
                return 'reviewed';
            case 'Deleted':
                return 'deleted';
            case 'Approved':
                return 'approved';
            case 'Rejected':
                return 'rejected';
            default:
                return '';
        }
    }

    formatDetails(log: AuditLog): string {
        if (log.details) {
            return `${log.details}: "${log.details}"`;
        }
        return log.details;
    }
}
