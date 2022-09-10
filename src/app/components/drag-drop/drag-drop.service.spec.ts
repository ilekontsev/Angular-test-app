import { TestBed } from '@angular/core/testing';
import { DragdropService } from './drag-drop.service';

describe('DragDropService', () => {
  let service: DragdropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragdropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
