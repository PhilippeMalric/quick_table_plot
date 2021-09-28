import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCsvComponent } from './load-csv.component';

describe('LoadCSVComponent', () => {
  let component: LoadCsvComponent;
  let fixture: ComponentFixture<LoadCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadCsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
