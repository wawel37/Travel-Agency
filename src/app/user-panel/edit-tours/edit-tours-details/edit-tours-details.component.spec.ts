import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditToursDetailsComponent } from './edit-tours-details.component';

describe('EditToursDetailsComponent', () => {
  let component: EditToursDetailsComponent;
  let fixture: ComponentFixture<EditToursDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditToursDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditToursDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
