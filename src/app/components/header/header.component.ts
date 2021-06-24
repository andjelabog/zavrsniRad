import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  rsFlag=true;

  constructor(private translate: TranslateService) { }

  changeLanguage() {
    if (this.translate.getDefaultLang() == 'sr'){
      this.translate.setDefaultLang('en')
      this.rsFlag = false;
    }
    else{
      this.translate.setDefaultLang('sr')
      this.rsFlag = true;
    }
  }
}
