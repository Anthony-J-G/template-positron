import { TestBed } from '@angular/core/testing';

import { ElectronBackendService } from './electron-backend.service';

describe('ElectronBackendService', () => {
  let service: ElectronBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
