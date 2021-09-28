import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadXlsxComponent } from './load-excel.component';

describe('LoadCSVComponent', () => {
  let component: LoadXlsxComponent;
  let fixture: ComponentFixture<LoadXlsxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadXlsxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadXlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
