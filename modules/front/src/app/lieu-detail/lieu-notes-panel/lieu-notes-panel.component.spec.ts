import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuNotesPanelComponent } from './lieu-notes-panel.component';

describe('LieuNotesPanelComponent', () => {
  let component: LieuNotesPanelComponent;
  let fixture: ComponentFixture<LieuNotesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LieuNotesPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LieuNotesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
