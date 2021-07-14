import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MailService {
  mailUrl = `${environment.apiUrl}/mail/testMail`;
  constructor(private http: HttpClient) { }

  public sendTestMail(data: String, mail: String): Observable<any> {
    return this.http
      .post(this.mailUrl, {"body": data, "email": mail})
      .pipe(map(response => response));
  }
}
