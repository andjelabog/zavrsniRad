import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  postsUrl = `${environment.apiUrl}/dashboard`;

  constructor(
    private http: HttpClient
  ) { }

  public getData(): Observable<any[]> {
    return this.http
      .get(this.postsUrl)
      .pipe(map(response => response['data'] as any[]));
  }

}
