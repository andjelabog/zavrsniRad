import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DounughtChartComponent } from './dounught-chart.component';

describe('DounughtChartComponent', () => {
  let component: DounughtChartComponent;
  let fixture: ComponentFixture<DounughtChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DounughtChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DounughtChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
