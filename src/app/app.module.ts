import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import pipes
import { TrimPipe } from './utils/trim.pipe';

// import components
import { AppComponent } from './app.component';
import { BaseComponent } from './components/base/base.component';
import { HeaderComponent } from './components/header/header.component';
import { ChartsComponent } from './components/modular-components/charts/charts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { DounughtChartComponent } from './components/modular-components/dounught-chart/dounught-chart.component';
import { LineChartComponent } from './components/modular-components/line-chart/line-chart.component';

import { FooterComponent } from './components/footer/footer.component';

// import services
import { PostService } from './services/post.service';
import { GovernmentService } from './services/government.service';
import { DashboardService } from './services/dashboard-service.service';
// import ngx-translate and the http loader

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MailService } from './services/mail.service';
import { ShowOnMapComponent } from './components/show-on-map/show-on-map.component';

// material imports
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';

const appRoutes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'map', component: ShowOnMapComponent }
    ]

  }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TrimPipe,
    BaseComponent,
    ChartsComponent,
    DashboardComponent,
    DounughtChartComponent,
    LineChartComponent,
    FooterComponent,
    ShowOnMapComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule,
    FormsModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    //material imports
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatCheckboxModule
  ],
  providers: [
    GovernmentService,
    MailService,
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}