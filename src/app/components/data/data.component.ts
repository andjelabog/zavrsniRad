import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';


export interface ProcessedData {
  name: string;
  value: string;
}


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  inputPieChartDataTotal = [];
  inputPieChartLabelsTotal = [];
  data = []

  inputPieChartData = [];
  inputPieChartLabels = [];
  constructor(private dataService: DataService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.dataService.getLastData().subscribe(data => {
      this.data = data[0];
      this.inputPieChartDataTotal = [this.data["totalCases"], this.data["totalDeaths"]];
      this.inputPieChartLabelsTotal = [this.translate.instant("totalCases"), this.translate.instant("totalDeaths")];
    });
  }

  /**
   * Function to prettify a number to a more user friendly view
   * @param x number
   * @returns 
   */
  numberWithCommas(x) {
    if (!!x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
  }

  getPercentage(x, y) {
    return ((100 * y) / x).toFixed(2);
  }
}
