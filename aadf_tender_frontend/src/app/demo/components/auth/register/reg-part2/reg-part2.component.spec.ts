import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPart2Component } from './reg-part2.component';

describe('RegPart2Component', () => {
  let component: RegPart2Component;
  let fixture: ComponentFixture<RegPart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegPart2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegPart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
