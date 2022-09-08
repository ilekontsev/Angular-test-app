import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DragdropService {
  constructor(private http: HttpClient) {}

  addFiles(images: File[]) {
    var arr: any = [];
    var formData = new FormData();
    arr.push(images);
    arr[0].forEach((item: any, i: number) => {
      formData.append('avatar', arr[0][i]);
    });
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
