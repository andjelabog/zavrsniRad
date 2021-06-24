import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import User from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  loginUrl = `${environment.apiUrl}/user/login`;
  registerUrl = `${environment.apiUrl}/user/register`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    let data = { "email": email, "password": password }
    return this.http.post(this.loginUrl, data).pipe(map(response => response));
  }

  register(user: User) {
    return this.http.post(this.registerUrl, user).pipe(map(response => response))
  }
}
