import { TestBed } from '@angular/core/testing';

import { AddLieuService } from './add-lieu.service';

describe('AddLieuService', () => {
  let service: AddLieuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddLieuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
