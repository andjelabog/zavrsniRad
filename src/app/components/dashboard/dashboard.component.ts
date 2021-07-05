import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard-service.service';
import { GovernmentService } from 'src/app/services/government.service';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  firstGraph = [[], []];
  firstGraphData = [];
  firstGraphChartLabels = [];

  secondGraph = [[], []];
  secondGraphData = [];
  secondGraphChartLabels = [];

  constructor(
    private mailService: MailService,
    private dashboardService: DashboardService, private gs: GovernmentService) { }

  ngOnInit(): void {
    this.getData();
  }
  sendMail() {
    this.mailService.sendTestMail().subscribe();
  }

  getData() {
    let numberForFirst = 0, numberForSecond = 0, starterForSecond = -1;
    this.dashboardService.getData().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (!data[i]['code'].includes("PROCENAT")) {
          this.firstGraph[numberForFirst] = [];
          this.firstGraph[numberForFirst][0] = (data[i]['name']);
          for (let j = 0; j < data[i]['data'].length; j++) {
            this.firstGraphData.push(data[i]['data'][j]['people'])
            if (i == 0) {
              this.firstGraphChartLabels.push(data[0]['data'][j]['date'])
              this.secondGraphChartLabels.push(data[0]['data'][j]['date'])

            }
          }
          this.firstGraph[numberForFirst++][1] = (this.firstGraphData);
          this.firstGraphData = [];
        }
        else {
          if (starterForSecond == -1)
            starterForSecond = i;
          this.secondGraph[numberForSecond] = [];
          this.secondGraph[numberForSecond][0] = (data[i]['name']);
          for (let j = 0; j < data[i]['data'].length; j++) {
            this.secondGraphData.push(data[i]['data'][j]['people'])
          }
          this.secondGraph[numberForSecond++][1] = (this.secondGraphData);
          this.secondGraphData = [];
        }
        // Adding another date to the end of the array of labels, to avoid "undefined"
        let date = new Date(this.firstGraphChartLabels[this.firstGraphChartLabels.length - 1]);
        date.setDate(date.getDate()+ 1);
        this.firstGraphChartLabels.push(formatDate(date,"yyyy-MM-dd","en"));
        date = new Date(this.secondGraphChartLabels[this.secondGraphChartLabels.length - 1]);
        date.setDate(date.getDate()+ 1); 
        this.secondGraphChartLabels.push(formatDate(date,"yyyy-MM-dd","en"));
      }
    })
  }
}
