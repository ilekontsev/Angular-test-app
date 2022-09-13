import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragDropService } from './drag-drop.service';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent implements OnInit, OnDestroy {
  msg: string;
  progress: number = 0;
  sub$: Subscription;

  constructor(public dragDropService: DragDropService) {}

  ngOnInit() {}

  upload(event: any): void {
    const fileListAsArray = Array.from(event);
    const fileArr = [];
    fileListAsArray.forEach((item, i) => {
      const file = event as HTMLInputElement;
      const url = URL.createObjectURL(file[i]);
      fileArr.push({ item, url: url });
    });
    this.dragDropService.setFileArr(fileArr);
    // Set files form control
    // this.form.patchValue({
    //   avatar: this.fileObj,
    // });
    // this.form.get('avatar').updateValueAndValidity();
    // Upload to server
    // this.dragDropService.addFiles(this.form.value.avatar);
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
