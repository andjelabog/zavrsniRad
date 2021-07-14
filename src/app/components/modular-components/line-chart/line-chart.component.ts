import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

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

  showLoader: boolean = true;

  /**
   * Options for chart.
   * Customisation of responsivenes, legend customization, tooltip, layout and hover customization
   * All various settings of graphs
   * Can be found : https://www.chartjs.org/
   */
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
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  constructor() {
  }


  ngOnInit() {
    // Try to avoid setTimeout function
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
        this.showLoader = false;
      }
    }, 5000);
  }


  /**
   * getColor(index) => custom colors
   * @param index 
   * @returns color with that index
   */
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
