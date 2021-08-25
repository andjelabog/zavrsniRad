import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard-service.service';
import { GovernmentService } from 'src/app/services/government.service';
import { MailService } from 'src/app/services/mail.service';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  email: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataFromMongoFirst: any[] = [];
  dataFromMongoSecond: any[] = [];

  firstGraph = [[], []];
  firstGraphData = [];
  firstGraphChartLabels = [];

  secondGraph = [[], []];
  secondGraphData = [];
  secondGraphChartLabels = [];

  emailForNode: string = "";
  mailer: number = 0;
  showLoader: boolean = true;

  constructor(
    private mailService: MailService,
    private dashboardService: DashboardService,
    private gs: GovernmentService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.getData();
  }

  /**
   * Retrieving and parsing data from MongoDB
   * Then sending it to line-chart-component
   */
  getData() {
    let numberForFirst = 0, numberForSecond = 0, starterForSecond = -1;
    this.dashboardService.getData().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (!data[i]['code'].includes("PROCENAT")) {

          this.dataFromMongoFirst.push(data[i]);

          this.firstGraph[numberForFirst] = [];
          this.firstGraph[numberForFirst][0] = (this.translate.getDefaultLang() == "sr") ? (data[i]['name']) : (data[i]['nameENG']);
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

          this.dataFromMongoSecond.push(data[i]);

          if (starterForSecond == -1)
            starterForSecond = i;
          this.secondGraph[numberForSecond] = [];
          this.secondGraph[numberForSecond][0] = (this.translate.getDefaultLang() == "sr") ? (data[i]['name']) : (data[i]['nameENG']);
          for (let j = 0; j < data[i]['data'].length; j++) {
            this.secondGraphData.push(data[i]['data'][j]['people'])
          }
          this.secondGraph[numberForSecond++][1] = (this.secondGraphData);
          this.secondGraphData = [];
        }

      }
      /**
         * Adding another date to the end of the array of labels, to avoid "undefined".
         * Without this, on hover over lines of graph, the last one is always undefined
         */
      let date = new Date(this.firstGraphChartLabels[this.firstGraphChartLabels.length - 1]);
      date.setDate(date.getDate() + 1);
      this.firstGraphChartLabels.push(formatDate(date, "yyyy-MM-dd", "en"));
      date = new Date(this.secondGraphChartLabels[this.secondGraphChartLabels.length - 1]);
      date.setDate(date.getDate() + 1);
      this.secondGraphChartLabels.push(formatDate(date, "yyyy-MM-dd", "en"));

      this.showLoader = false;
    })
  }

  /**
   * Send all data to mail via CSV format
   */
  sendMail() {
    if (this.mailer != 0 && this.emailForNode != "")
      this.mailService.sendTestMail(
        JSON.stringify(
          this.createCSVArray(
            this.prepareDataForDownloadOrMail(this.mailer)
          )
        ), this.emailForNode
      ).subscribe();
  }

  /**
   * Downloading all data as a CSV format
   * @param whatData => what kind of data.
   * Meaning are we gathering data from 1st or 2nd graph
   */
  downloadAsCSV(whatData: any) {
    let data = this.prepareDataForDownloadOrMail(whatData);
    const csvArray = this.createCSVArray(data);

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'zavrsniRad.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  /**
   * 
   * @param data for parsing to CSV array
   * @returns CSV Array
   */
  createCSVArray(data: any) {
    const replacer = (key, value) => (value === null ? '' : value); // Specify how to handle null values
    const header = Object.keys(data[0]);
    const csv = data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
    return csvArray;
  }

  /**
   * 
   * @param kindOfData => what kind of data are we prepairing?
   * Meaning, are we looking into 1st or 2nd graph?
   * @returns preparsed data ready to convert to csv
   */
  prepareDataForDownloadOrMail(kindOfData: number) {
    if (kindOfData == 1) {
      let preparedArray = [];
      this.dataFromMongoFirst.forEach(element => {
        element.data.forEach(data => {
          preparedArray.push({
            name: (this.translate.getDefaultLang() == "sr") ? element.name : element.nameENG,
            date: data['date'],
            people: data['people']
          })
        })
      })
      return preparedArray;
    }
    else if (kindOfData == 2) {
      let preparedArray = [];
      this.dataFromMongoSecond.forEach(element => {
        element.data.forEach(data => {
          preparedArray.push({
            name: element.name,
            date: data['date'],
            people: data['people']
          })
        })
      })
      return preparedArray;
    }
  }

  /**
   * Function as an assist, with what kind of data to send via mail
   * @param number 
   */
  setMailer(number) {
    this.mailer = number;
  }
  /**
   * Opening Angular-Material dialog. 
   * @param action 
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DashboardDialog, {
      width: '250px',
      data: { email: this.emailForNode }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.emailForNode = result;
      this.sendMail();
    });
  }


}





@Component({
  selector: 'dashboard-dialog',
  templateUrl: `dashboard-dialog.component.html`,
})
export class DashboardDialog {

  constructor(
    public dialogRef: MatDialogRef<DashboardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}