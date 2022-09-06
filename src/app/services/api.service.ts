import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _httpClient: HttpClient) {}

  callApi(route: string, method = 'GET', body: any = {}): Observable<any> {
    const api = `/api/v1/${route}`;
    switch (method) {
      case 'GET':
        return this._httpClient.get(api);
      case 'POST':
        return this._httpClient.post(api, body);
      default:
        return of(null);
    }
  }
}
