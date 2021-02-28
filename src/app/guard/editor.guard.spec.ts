import { TestBed } from '@angular/core/testing';

import { EditorGuard } from './editor.guard';

describe('EditorGuard', () => {
  let guard: EditorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
