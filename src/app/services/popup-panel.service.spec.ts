import { TestBed } from '@angular/core/testing';

import { PopupPanelService } from './popup-panel.service';

describe('PopupPanelService', () => {
  let service: PopupPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
