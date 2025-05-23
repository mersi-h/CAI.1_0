import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateReportsComponent } from './generate-reports.component';

describe('GenerateReportsComponent', () => {
  let component: GenerateReportsComponent;
  let fixture: ComponentFixture<GenerateReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
