import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareTwoDsComponent } from './compare-two-ds.component';

describe('CompareTwoDsComponent', () => {
  let component: CompareTwoDsComponent;
  let fixture: ComponentFixture<CompareTwoDsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareTwoDsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareTwoDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
