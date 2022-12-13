import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthroizedHomeComponent } from './unauthroized-home.component';

describe('UnauthroizedHomeComponent', () => {
  let component: UnauthroizedHomeComponent;
  let fixture: ComponentFixture<UnauthroizedHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthroizedHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthroizedHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
