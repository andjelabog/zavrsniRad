import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dounught-chart',
  templateUrl: './dounught-chart.component.html',
  styleUrls: ['./dounught-chart.component.css']
})
export class DounughtChartComponent implements OnInit {
  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';
  public doughnutChartLegend = false;
  constructor() { }

  ngOnInit(): void {
  }

}
