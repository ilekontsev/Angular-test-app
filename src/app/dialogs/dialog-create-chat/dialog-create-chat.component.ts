import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog-create-chat',
  templateUrl: './dialog-create-chat.component.html',
  styleUrls: ['./dialog-create-chat.component.scss'],
})
export class DialogCreateChatComponent implements OnInit {
  chatName = '';

  constructor(
    private _apiService: ApiService,
    private _formBuilder: FormBuilder
  ) {}

  form = this._formBuilder.group({
    chatName: [null, [Validators.required]],
  });

  ngOnInit(): void {}

  createChat(form) {
    form.name = form.chatName;
    form.userId = '21';
    form.usersId = ['21'];
    this._apiService.callApi('/chats', 'POST', form).subscribe();
  }
}
