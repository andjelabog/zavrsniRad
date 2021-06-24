import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import User from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('sr');
  }
}
