import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DragDropService {
  fileArr = new BehaviorSubject([]);
  files = [];
  constructor() {}

  setFileArr(files) {
    this.files.push(files);
    this.fileArr.next(files);
  }
}
