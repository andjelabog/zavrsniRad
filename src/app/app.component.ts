import { Component, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    let localStorageLNG = null;
    localStorageLNG = localStorage.getItem("lng");
    translate.setDefaultLang(localStorageLNG == null ? 'sr' : localStorageLNG);
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
}
