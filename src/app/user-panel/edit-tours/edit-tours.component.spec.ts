import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditToursComponent } from './edit-tours.component';

describe('EditToursComponent', () => {
  let component: EditToursComponent;
  let fixture: ComponentFixture<EditToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditToursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
