import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';

import {TokenStorageService} from "../../../layout/service/token-storage.service";
import {LayoutService} from "../../../layout/service/app.layout.service";

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    public list: { start: string, title: string, importance: number }[] = [];

    public role: string;



    constructor(private productService: ProductService,
                private readonly tokenStorage: TokenStorageService,
                public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }
    ngOnInit() {
        this.initChart();

        this.role = this.tokenStorage.getUser().role;
        console.log(this.role)


        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];

        this.list=[
            { start: '2023-01-01', title: 'Backend API', importance: 5 },
            { start: '2023-02-15', title: 'Project View', importance: 2 },
            { start: '2023-03-10', title: 'Dark Mode', importance: 1 },
            { start: '2023-04-20', title: 'New Implementation', importance: 4 },
            { start: '2023-05-05', title: 'General Task', importance: 3 }
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Team Smart',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Team Easy Plan Gate',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }


    openTendersCount: number = 8;
    openTendersClosingSoon: number = 2;
    newSubmissionsCount: number = 23;
    newSubmissionsAwaitingReview: number = 12;
    pendingApprovalsCount: number = 5;
    pendingApprovalsHighPriority: number = 2;
    completedTendersCount: number = 42;
    completedTendersThisMonth: number = 3;

    activeTenders: any[] = [
        { tenderId: 'AADF-2025-H01', title: 'Hackathon Organization', deadline: 'May 20, 2025', submissions: 8, status: 'Submission' },
        { tenderId: 'AADF-2025-E02', title: 'Educational Programs', deadline: 'June 10, 2025', submissions: 5, status: 'Active' },
        { tenderId: 'AADF-2025-T03', title: 'Tourism Development', deadline: 'June 30, 2025', submissions: 10, status: 'Active' }
    ];

    aiInsights: string[] = [
        '3 submissions for "Hackathon Organization" are missing required financial forms.',
        'Based on evaluation criteria, 2 vendors are significantly above threshold requirements.'
    ];

    deadlineStages: any[] = [
        { name: 'published', label: 'Published', deadline: new Date('2025-05-05') },
        { name: 'qa', label: 'Q&A', deadline: new Date('2025-05-10') },
        { name: 'submission', label: 'Submission', deadline: new Date('2025-05-20') },
        { name: 'evaluation', label: 'Evaluation', deadline: new Date('2025-05-25') },
        { name: 'decision', label: 'Decision', deadline: new Date('2025-05-30') },
        { name: 'award', label: 'Award', deadline: new Date('2025-06-05') }
    ];

    currentStage: string = 'submission';

    deadlineSteps: MenuItem[] = [
        { label: 'Published', styleClass: 'published-step' },
        { label: 'Q&A', styleClass: 'qa-step' },
        { label: 'Submission', styleClass: 'submission-step' },
        { label: 'Evaluation', styleClass: 'evaluation-step' },
        { label: 'Decision', styleClass: 'decision-step' },
        { label: 'Award', styleClass: 'award-step' }
    ];

    currentStepIndex: number = 2; // Initialize to the 'Submission' step (index 2)

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
