import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackResultComponent } from './track-result.component';

describe('TrackResultComponent', () => {
  let component: TrackResultComponent;
  let fixture: ComponentFixture<TrackResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
