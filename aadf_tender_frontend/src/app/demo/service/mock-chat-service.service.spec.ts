import { TestBed } from '@angular/core/testing';

import { MockChatServiceService } from './mock-chat-service.service';

describe('MockChatServiceService', () => {
  let service: MockChatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockChatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
