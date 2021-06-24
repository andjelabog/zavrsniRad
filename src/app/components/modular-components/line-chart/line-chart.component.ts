import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() inputLineChartData = [[], []];
  @Input() inputLineChartLabels = [];
  @Input() selectedLabel: String = "";

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 2,
    legend: {
      display: false,
      position: 'right',
      labels: {
        usePointStyle: true, 
      },
      align: 'center'
    },
    spanGaps: true,
    tooltips: {
      mode: 'nearest',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    layout : {
      padding : 50
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() {
  }

  ngOnInit() {

    setTimeout(() => {
      if (!!this.inputLineChartData && this.inputLineChartData.length > 0 && !!this.inputLineChartLabels && this.inputLineChartLabels.length > 0) {
        this.lineChartData = [];
        this.lineChartLabels = [];
        for (let i = 0; i < this.inputLineChartData.length; i++) {
          this.lineChartData.push(
            {
              label: this.inputLineChartData[i][0],
              data: this.inputLineChartData[i][1]
            }
          )
          break;// OVDE CEMO PAKOVATI U NIZ ZA PRIKAZ
        }
        this.lineChartLabels = this.inputLineChartLabels;
      }
    }, 5000);
  }

}
