import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  accessToken = '';

  constructor(private _httpClient: HttpClient) {}

  setToken(tokens) {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  callApi(route: string, method = 'GET', body: any = {}): Observable<any> {
    const api = `/api/v1/${route}`;
    switch (method) {
      case 'GET':
        return this._httpClient.get(api);
      case 'POST':
        return this._httpClient.post(api, body);
      case 'PATCH':
        return this._httpClient.patch(api, body);
      default:
        return of(null);
    }
  }
}
