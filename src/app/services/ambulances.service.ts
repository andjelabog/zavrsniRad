import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmbulancesService {
  getUrl = `${environment.apiUrl}/ambulance`;

  constructor(
    private http: HttpClient
  ) { }

  public getData(): Observable<any[]> {
    return this.http
      .get(this.getUrl)
      .pipe(map(response => response['data'] as any[]));
  }

}
