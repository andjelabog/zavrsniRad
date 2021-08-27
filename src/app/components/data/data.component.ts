import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  inputPieChartData = [];
  inputPieChartLabels = [];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getLastData().subscribe(data=> {
      this.inputPieChartData = [data[0]["population"], data[0]["peopleFullyVaccinated"]];
      this.inputPieChartLabels = ["Population", "People fully Vaccinated"]
    });
  }

}
