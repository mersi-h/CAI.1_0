import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTendersComponent } from './share-tenders.component';

describe('ShareTendersComponent', () => {
  let component: ShareTendersComponent;
  let fixture: ComponentFixture<ShareTendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareTendersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
