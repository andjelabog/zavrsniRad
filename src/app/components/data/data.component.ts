import { Component, OnInit } from '@angular/core';
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

  collectedData: ProcessedData[] = [];
  displayedColumns: string[] = ['item', 'cost'];

  inputPieChartData = [];
  inputPieChartLabels = [];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getLastData().subscribe(data => {
      this.preparseData(data[0]);
      this.inputPieChartData = [data[0]["population"], data[0]["peopleFullyVaccinated"]];
      this.inputPieChartLabels = ["Population", "People fully Vaccinated"]
    });
  }


  preparseData(data) {
    let array = Object.entries(data);
    for (let i = 1; i < array.length - 2; i++) {
      this.collectedData.push({
        name: array[i][0] + '',
        value: array[i][1] + ''
      });
    }
  }
  
  /**
   * Function to prettify a number to a more user friendly view
   * @param x number
   * @returns 
   */
  numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
}
