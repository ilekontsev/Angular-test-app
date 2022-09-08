import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StoreHelperService } from 'src/app/services/store-helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  data: any = {};

  constructor(
    private _storeHelperService: StoreHelperService,
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private _activateRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._storeHelperService.isDisableNavigationPanel.next(true);
    this.data = this._activateRoute.snapshot.data;
    this.initForm();
  }

  initForm() {
    switch (this.data.step) {
      case 'login':
        this.loginForm = this._formBuilder.group({
          email: [null, [Validators.required, Validators.email]],
          password: [null, [Validators.required]],
        });
        break;
      case 'preRegistration':
        this.loginForm = this._formBuilder.group({
          email: [null, [Validators.required, Validators.email]],
        });
        break;
      case 'registration':
        this.loginForm = this._formBuilder.group({
          firstName: [null, [Validators.required]],
          lastName: [null, [Validators.required]],
          password: [null, [Validators.required]],
          repeatPassword: [null, [Validators.required]],
        });
        break;
    }
  }

  onCreateUser(data: any) {
    this._apiService.callApi('auth/register', 'POST', data).subscribe();
    this.loginForm.reset();
  }

  onRegisterUser(data: any) {
    if (data.password !== data.repeatPassword) {
      this.loginForm.setValue({
        ...data,
        password: null,
        repeatPassword: null,
      });
      return;
    }
    const queryParams: any = this._activateRoute.snapshot.queryParams;
    if (!queryParams.code || !queryParams.email) {
      return;
    }
    data.email = queryParams.email;
    data.code = queryParams.code;

    this._apiService
      .callApi('auth/register', 'PATCH', data)
      .subscribe((res) => {
        this.onSignIn(data);
      });
    this.loginForm.reset();
  }

  onSignIn(data: any) {
    this._apiService.callApi('auth/login', 'POST', data).subscribe((res) => {
      document.cookie = `accessToken=${res.accessToken}`;
      this._router.navigateByUrl('/chat');
    });
  }
}
