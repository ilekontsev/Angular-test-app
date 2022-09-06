import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StoreHelperService } from 'src/app/services/store-helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  data: any = {};

  constructor(
    private _storeHelperService: StoreHelperService,
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private _activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._storeHelperService.isDisableNavigationPanel.next(true);
    this.data = this._activateRoute.snapshot.data;

    this.initForm();
  }

  initForm() {
    this.formLogin = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  isControlInvalid(formName: string) {
    const control = this.formLogin.controls[formName];
    return control.invalid;
  }

  handleRedirect() {
    const body = { email: this.formLogin.controls['email'].value };
    this._apiService
      .callApi('auth/register', 'POST', body)
      .subscribe(console.log);
    this.formLogin.reset();
  }
}
