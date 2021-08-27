import { AfterViewInit, Component, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(private translate: TranslateService, public dialog: MatDialog) {
    let localStorageLNG = null;
    localStorageLNG = localStorage.getItem("lng");
    translate.setDefaultLang(localStorageLNG == null ? 'sr' : localStorageLNG);
  }


  ngAfterViewInit(): void {
    this.openDialog();
  }


  getTranslate() {
    return this.translate;
  }
  changeLanguage() {
    if (this.translate.getDefaultLang() == 'sr') {
      this.translate.setDefaultLang('en');
      localStorage.setItem("lng", "en");
      // location.reload();
    }
    else {
      this.translate.setDefaultLang('sr');
      localStorage.setItem("lng", "sr");
      // location.reload();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(WelcomeDialog,{
      // hasBackdrop: true,
      backdropClass: 'backdropBackground'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}

@Component({
  selector: 'welcome-dialog',
  templateUrl: 'welcome-dialog.html',
  styleUrls: ['./app.component.css']
})
export class WelcomeDialog {
  constructor(private translate: TranslateService) {
 }
}