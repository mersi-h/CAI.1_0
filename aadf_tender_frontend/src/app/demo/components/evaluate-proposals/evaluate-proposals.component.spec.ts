import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateProposalsComponent } from './evaluate-proposals.component';

describe('EvaluateProposalsComponent', () => {
  let component: EvaluateProposalsComponent;
  let fixture: ComponentFixture<EvaluateProposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluateProposalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluateProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
