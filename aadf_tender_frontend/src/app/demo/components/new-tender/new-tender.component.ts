import {Component, HostListener, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {an} from "@fullcalendar/core/internal-common";
import {Tender} from "../../../model/Tender";
import {TenderService} from "../../service/tender-management/tender.service";

@Component({
    selector: 'app-new-tender',
    templateUrl: './new-tender.component.html',
    styleUrls: ['./new-tender.component.scss']
})
export class NewTenderComponent implements OnInit {
    steps: MenuItem[] = [
        {label: 'Details'},
        {label: 'Requirements'}
    ];
    activeStepIndex: number = 0;
    tenderId: string = 'AADF-2025-T04'; // Example, should be dynamic

    subcontractingLst: any[] = [
        {name: 'Allowed', code: 'ALLOWED'},
        {name: 'Not Allowed', code: 'NOTALLOWED'},
    ]
    selectedCategory: any;
    tenderAmount: any;
    tenderTitle: string = '';

    challengeAreas: any[] = [
        {name: 'Education Accessibility'},
        {name: 'Tourism Development'},
        {name: 'Digital Public Services'},
        {name: 'Cultural Heritage Preservation'}
    ];
    selectedChallengeAreas: any[] = [];
    tenderDescription: string = `AADF seeks proposals for organizing a Hackathon focused on using technology to address Albania's social challenges. The event should bring together developers, designers, and entrepreneurs to create innovative solutions in one of these areas:

1.  Education Accessibility
2.  Tourism Development
3.  Digital Public Services
4.  Cultural Heritage Preservation`;


    qualifications: { position: string, note: string }[] = [
        {position: '', note: ''}
    ];

    public divHeight: string;
    public tender: Tender = new Tender();
    public data: any;

    constructor(private readonly tenderService: TenderService) {
    }

    ngOnInit(): void {
        if (!this.tender.qualifications) {
            this.tender.qualifications = [];
        }
        this.setHeight();
    }


    @HostListener('window:resize', ['$event'])
    onResize() {
        this.setHeight();
    }

    nextStep() {
        if (this.activeStepIndex < this.steps.length - 1) {
            this.activeStepIndex++;
        }
    }

    previousStep() {
        if (this.activeStepIndex > 0) {
            this.activeStepIndex--;
        }
    }


    isNextDisabled(): boolean {
        // if (this.activeStepIndex === 0) {
        //     return !this.selectedCategory || !this.tenderDescription || !this.tenderAmount; // Example validation
        // }
        return false; // Default: enable the button
    }


    addQualification() {
        if (!this.tender.qualifications) {
            this.tender.qualifications = [];
        }
        this.tender.qualifications.push({ position: '', note: '' });
    }

    removeQualification(index: number) {
        this.tender.qualifications.splice(index, 1);
    }



    private setHeight() {
        const modalHeight = window.innerHeight;
        const headerHeight = 360; //  header's height
        this.divHeight = `${modalHeight - headerHeight}px`;
    }

    saveData() {
        this.tenderService.saveTenderInfo(this.tender).subscribe({
            next: (data) => this.tender = data,
            error: (err) => console.log(err)
        })
    }
}
