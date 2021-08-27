import { Component, Input, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() inputPieChartData = [];
  @Input() inputPieChartLabels = [];

  showLoader: boolean = true;


  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (!!this.inputPieChartLabels && this.inputPieChartLabels.length > 0
        && !!this.inputPieChartData && this.inputPieChartData.length > 0) {
        this.pieChartData = this.inputPieChartData;
        this.pieChartLabels = this.inputPieChartLabels;
        console.log(this.pieChartData)
        console.log(this.pieChartLabels)
      }
      this.showLoader = false;
    }, 3000);
  }

}
