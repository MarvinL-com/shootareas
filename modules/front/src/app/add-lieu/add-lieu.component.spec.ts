import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLieuComponent } from './add-lieu.component';

describe('AddLieuComponent', () => {
  let component: AddLieuComponent;
  let fixture: ComponentFixture<AddLieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLieuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
