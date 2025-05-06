import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {interval, Subscription} from "rxjs";

interface Tender {
    id: number;
    name: string;
    description: string;
}

interface DocumentType {
    id: number;
    name: string;
}

interface Vendor {
    id: number;
    name: string;
    matchPercentage: number;
    details: {
        contact: string;
        specialization: string;
        previousProjects: number;
        certification: string[];
    };
    requirements: {
        requirement: string;
        matched: boolean;
    }[];
}


@Component({
    selector: 'app-evaluation-dashboard',
    templateUrl: './evaluation-dashboard.component.html',
    styleUrl: 'evaluation-dashboard.component.scss',
    providers: [MessageService]
})
export class EvaluationDashboardComponent implements OnInit {
    tenders: Tender[] = [];
    documentTypes: DocumentType[] = [];
    vendors: Vendor[] = [];
    filteredVendors: Vendor[] = [];

    selectedTender: Tender | null = null;
    selectedDocumentType: DocumentType | null = null;
    loading: boolean = false;
    searchText: string = '';

    // AI Animation properties
    processingProgress: number = 0;
    processingStage: number = 0;
    processingSubscription: Subscription | null = null;

    constructor(private messageService: MessageService) { }

    ngOnInit() {
        this.loadTenders();
        this.loadDocumentTypes();
    }

    ngOnDestroy() {
        this.stopProcessingAnimation();
    }

    loadTenders() {
        // Mock data - replace with actual API call
        this.tenders = [
            { id: 1, name: 'Office Supplies Procurement', description: 'Procurement of office supplies for Q3 2025' },
            { id: 2, name: 'IT Infrastructure Upgrade', description: 'Server and networking equipment upgrade' },
            { id: 3, name: 'Software Development Services', description: 'Custom software development for internal use' },
            { id: 4, name: 'Security Systems Installation', description: 'Installation of security systems for headquarters' },
            { id: 5, name: 'Fleet Vehicle Maintenance', description: 'Maintenance services for company vehicles' }
        ];
    }

    loadDocumentTypes() {
        // Mock data - replace with actual API call
        this.documentTypes = [
            { id: 1, name: 'Technical Specifications' },
            { id: 2, name: 'Financial Proposal' },
            { id: 3, name: 'Legal Documentation' },
            { id: 4, name: 'Certifications' },
            { id: 5, name: 'Past Performance' },
            { id: 6, name: 'Sustainability Report' }
        ];
    }

    evaluateVendors() {
        if (!this.selectedTender) {
            this.messageService.add({
                severity: 'error',
                summary: 'Missing Selection',
                detail: 'Please select both a tender and document type'
            });
            return;
        }

        this.loading = true;
        this.vendors = [];
        this.filteredVendors = [];

        // Start the AI processing animation
        this.startProcessingAnimation();

        // Simulate API call time
        setTimeout(() => {
            this.fetchVendorResults();
        }, 5000); // Wait 5 seconds before fetching results
    }

    fetchVendorResults() {
        // Mock vendor data - replace with actual API response
        this.vendors = [
            {
                id: 1,
                name: 'TechSupplies Ltd',
                matchPercentage: 87,
                details: {
                    contact: 'contact@techsupplies.com',
                    specialization: 'IT Hardware & Services',
                    previousProjects: 12,
                    certification: ['ISO 9001', 'ISO 27001']
                },
                requirements: [
                    { requirement: 'Next-day delivery capability', matched: true },
                    { requirement: 'Eco-friendly packaging', matched: true },
                    { requirement: 'Local service center', matched: false },
                    { requirement: 'Extended warranty options', matched: true }
                ]
            },
            {
                id: 2,
                name: 'Global IT Solutions',
                matchPercentage: 92,
                details: {
                    contact: 'sales@globalitsolutions.com',
                    specialization: 'IT Systems Integration',
                    previousProjects: 23,
                    certification: ['ISO 9001', 'ISO 27001', 'CMMI Level 5']
                },
                requirements: [
                    { requirement: 'Next-day delivery capability', matched: true },
                    { requirement: 'Eco-friendly packaging', matched: true },
                    { requirement: 'Local service center', matched: true },
                    { requirement: 'Extended warranty options', matched: true }
                ]
            },
            {
                id: 3,
                name: 'Office Pro Inc',
                matchPercentage: 65,
                details: {
                    contact: 'info@officepro.com',
                    specialization: 'Office Equipment',
                    previousProjects: 8,
                    certification: ['ISO 9001']
                },
                requirements: [
                    { requirement: 'Next-day delivery capability', matched: true },
                    { requirement: 'Eco-friendly packaging', matched: false },
                    { requirement: 'Local service center', matched: false },
                    { requirement: 'Extended warranty options', matched: true }
                ]
            },
            {
                id: 4,
                name: 'Enterprise Solutions',
                matchPercentage: 78,
                details: {
                    contact: 'enterprise@solutions.com',
                    specialization: 'Enterprise Software',
                    previousProjects: 17,
                    certification: ['ISO 9001', 'SOC 2']
                },
                requirements: [
                    { requirement: 'Next-day delivery capability', matched: false },
                    { requirement: 'Eco-friendly packaging', matched: true },
                    { requirement: 'Local service center', matched: true },
                    { requirement: 'Extended warranty options', matched: true }
                ]
            },
            {
                id: 5,
                name: 'Innovative Tech Partners',
                matchPercentage: 95,
                details: {
                    contact: 'contact@innovativetech.com',
                    specialization: 'IT Consulting & Development',
                    previousProjects: 31,
                    certification: ['ISO 9001', 'ISO 27001', 'CMMI Level 5', 'SOC 2']
                },
                requirements: [
                    { requirement: 'Next-day delivery capability', matched: true },
                    { requirement: 'Eco-friendly packaging', matched: true },
                    { requirement: 'Local service center', matched: true },
                    { requirement: 'Extended warranty options', matched: true }
                ]
            }
        ];

        // Complete the animation
        this.completeProcessingAnimation();

        setTimeout(() => {
            this.filteredVendors = [...this.vendors];
            this.loading = false;

            this.messageService.add({
                severity: 'success',
                summary: 'Evaluation Complete',
                detail: `Found ${this.vendors.length} potential vendors`
            });
        }, 1000); // Additional delay for smooth transition
    }

    filterVendors() {
        if (!this.searchText.trim()) {
            this.filteredVendors = [...this.vendors];
            return;
        }

        const searchLower = this.searchText.toLowerCase();
        this.filteredVendors = this.vendors.filter(vendor =>
            vendor.name.toLowerCase().includes(searchLower) ||
            vendor.details.specialization.toLowerCase().includes(searchLower) ||
            vendor.requirements.some(req => req.requirement.toLowerCase().includes(searchLower))
        );
    }

    getMatchClass(percentage: number): string {
        if (percentage >= 90) return 'match-excellent';
        if (percentage >= 75) return 'match-good';
        if (percentage >= 50) return 'match-average';
        return 'match-poor';
    }

    clearFilters() {
        this.selectedTender = null;
        this.selectedDocumentType = null;
        this.searchText = '';
        this.vendors = [];
        this.filteredVendors = [];
        this.stopProcessingAnimation();
    }

    // AI Animation methods
    startProcessingAnimation() {
        this.processingProgress = 0;
        this.processingStage = 1;

        // Create animation timeline with stages
        this.processingSubscription = interval(300).subscribe(count => {
            // Update progress based on animation step
            if (count <= 5) {
                this.processingProgress = 10 + count * 4;
            } else if (count <= 10) {
                this.processingProgress = 30 + (count - 5) * 4;
                this.processingStage = 2;
            } else if (count <= 15) {
                this.processingProgress = 50 + (count - 10) * 3;
                this.processingStage = 3;
            } else if (count <= 20) {
                this.processingProgress = 65 + (count - 15) * 2;
                this.processingStage = 4;
            } else {
                this.processingProgress = 75 + (count - 20);
                this.processingStage = 5;

                // Cap at 95% until results are ready
                if (this.processingProgress > 95) {
                    this.processingProgress = 95;
                }
            }
        });
    }

    completeProcessingAnimation() {
        // Complete the animation
        this.processingProgress = 100;
        this.processingStage = 6;
        this.stopProcessingAnimation();
    }

    stopProcessingAnimation() {
        if (this.processingSubscription) {
            this.processingSubscription.unsubscribe();
            this.processingSubscription = null;
        }
    }
}
