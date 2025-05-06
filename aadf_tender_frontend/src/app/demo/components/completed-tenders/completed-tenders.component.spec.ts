import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTendersComponent } from './completed-tenders.component';

describe('CompletedTendersComponent', () => {
  let component: CompletedTendersComponent;
  let fixture: ComponentFixture<CompletedTendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedTendersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletedTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
