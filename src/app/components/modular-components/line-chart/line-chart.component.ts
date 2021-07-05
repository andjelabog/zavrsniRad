import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) private _chart: BaseChartDirective
  public getLegendCallback: any = ((self: this): any => {
    function handle(chart: any): any {
      console.log(chart.legend)
      return chart.legend.legendItems;
    }

    return function (chart: Chart): any {
      console.log(chart)
      return handle(chart);
    };
  })(this);

  @Input() inputLineChartData = [[], []];
  @Input() inputLineChartLabels = [];
  @Input() selectedLabel: String = "";

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 2,
    legend: {
      display: true,
      position: 'right',
      labels: {
        usePointStyle: true,
      },
      align: 'end',
    },
    legendCallback: this.getLegendCallback,
    spanGaps: true,
    tooltips: {
      mode: 'x-axis',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    layout: {
      padding: 50
    },
    scales: {
      ticks: { min: 0 },
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]

    }
  };
  public lineChartColors: Color[] = [
    {
      // borderColor: 'black',
      //   backgroundColor: [
      //     '#4BB3D2',
      //     '#41c298',
      //     '#EBA538',
      //     '#D94D4D',
      //     '#7D3EB4',
      //     '#d15d9b',
      //     '#775D45',
      //     '#4E5DD1',
      //     '#79265C',
      //     '#B7AF50',
      //     '#a7c992',
      //     '#cc9d84',
      //     '#87AB66',
      //     '#d47fbd',
      //     '#94acfc'],
    }
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
              data: this.inputLineChartData[i][1],
              hidden: true,
              fill: false,
              backgroundColor: this.getColor(i),
            }
          )
        }
        this.lineChartData[0].hidden = false; // Show only the first one
        this.lineChartLabels = this.inputLineChartLabels;
      }
    }, 5000);
  }

  getColor(index) {
    let colors = [
      '#4BB3D2',
      '#41c298',
      '#EBA538',
      '#D94D4D',
      '#7D3EB4',
      '#d15d9b',
      '#775D45',
      '#4E5DD1',
      '#79265C',
      '#B7AF50',
      '#485C62',
      '#a7c992',
      '#cc9d84',
      '#87AB66',
      '#d47fbd',
      '#94acfc',
    ];
    return colors[index];
  }


}
