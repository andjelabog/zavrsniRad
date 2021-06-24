import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from "rxjs/operators";

@Injectable()
export class GovernmentService {
  postsUrl = `${environment.apiUrl}/govs/`;

  constructor(private http: HttpClient) { }

  getStatisticsForADate(date: any) {
    const body = { "dataSetId": 1, "refCodes": [{ "id": 1, "code": "COVID-19 статистике заражени", "values": [{ "id": 1, "name": "Заражено у дану" }] }], "territoryGroupId": 5, "dimTime": date, "hash": "libyevzigrlfeEGTOUvQu0eeaQUA5pyp" }
    return this.http.post(`${this.postsUrl}`, body)
      .pipe(map(response => response))
  }
}
