import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(private translate: TranslateService) {
  }
  getTranslate() {
    return this.translate;
  }
  changeLanguage() {
    if (this.translate.getDefaultLang() == 'sr') {
      this.translate.setDefaultLang('en')
      localStorage.setItem("lng", "en")
    }
    else {
      this.translate.setDefaultLang('sr')
      localStorage.setItem("lng", "sr")
    }
  }
}
