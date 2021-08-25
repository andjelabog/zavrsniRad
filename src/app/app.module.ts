import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// import pipes
import { TrimPipe } from './utils/trim.pipe';

// import components
import { AppComponent } from './app.component';
import { ChartsComponent } from './components/modular-components/charts/charts.component';
import { DashboardComponent, DashboardDialog } from './components/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { DounughtChartComponent } from './components/modular-components/dounught-chart/dounught-chart.component';
import { LineChartComponent } from './components/modular-components/line-chart/line-chart.component';
import { AmbulancesComponent } from './ambulances/ambulances.component';
import { ShowOnMapComponent } from './components/show-on-map/show-on-map.component';

// import services
import { GovernmentService } from './services/government.service';
import { DashboardService } from './services/dashboard-service.service';
import { MailService } from './services/mail.service';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// material imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';



const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'map', component: ShowOnMapComponent },
  { path: 'ambulances', component: AmbulancesComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    TrimPipe,
    ChartsComponent,
    DashboardComponent,
    DashboardDialog,
    DounughtChartComponent,
    LineChartComponent,
    ShowOnMapComponent,
    AmbulancesComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlexLayoutModule,
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
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule
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