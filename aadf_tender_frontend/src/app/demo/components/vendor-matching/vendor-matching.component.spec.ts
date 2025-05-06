import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMatchingComponent } from './vendor-matching.component';

describe('VendorMatchingComponent', () => {
  let component: VendorMatchingComponent;
  let fixture: ComponentFixture<VendorMatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorMatchingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
