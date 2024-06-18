import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { IAlertMessage } from '../../../@theme/components/alert/ngx-alerts.component';
import { ApiService, LocalStorageService } from '../common';
import { ILogin } from '../../interfaces/login.interface';
import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';
import { UserInfoModel } from '../../model/user-info.model';
import { LOCALSTORAGE_KEY } from '../../config';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  private loginInfo: ILogin;
  private alertMessages: IAlertMessage;
  private jwtHelperService = new JwtHelperService();

  constructor(
    private _http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    super(_http);
  }

  private readonly baseUrl = 'http://localhost:3456/users';
  login(credentials: { email: string; password: string }): Observable<any> {
    return this._http.post(`${this.baseUrl}/login`, credentials);
  }

  requirePassword(form: ILogin): Observable<any> {
    return this.post(API_BASE_URL + API_ENDPOINT.auth.login, {
      idLogin: this.getIdLogin(),
      password: form.password,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword,
    });
  }

  changePassword(form: ILogin): Observable<any> {
    return this.post(API_BASE_URL + API_ENDPOINT.auth.changePassword, {
      oldPassword: form.password,
      newPassword: form.newPassword,
      confirmNewPassword: form.confirmPassword,
      token: this.getToken(),
    });
  }

  forgotPassword(form: ILogin): Observable<any> {
    return this.post(API_BASE_URL + API_ENDPOINT.auth.forgotPassword, {
      idLogin: form.idLogin,
    });
  }

  confirmPassword(form: ILogin): Observable<any> {
    return this.post(API_BASE_URL + API_ENDPOINT.auth.confirmPassword, {
      idLogin: this.getIdLogin(),
      newPassword: form.newPassword,
      verificationCode: form.verificationCode,
    });
  }

  updateProfile(form: UserInfoModel): Observable<any> {
    return this.patch(API_BASE_URL + API_ENDPOINT.auth.updateProfile, {
      firstName: form.firstName,
      lastName: form.lastName,
      token: this.getToken(),
    });
  }

  getIdLogin() {
    if (this.loginInfo) {
      return this.loginInfo.idLogin;
    }
    return null;
  }

  cacheLoginInfo(value: ILogin) {
    return (this.loginInfo = value);
  }

  cacheUpdateMessage(alertMessages: any) {
    return (this.alertMessages = alertMessages);
  }

  clearMessage() {
    return (this.alertMessages = null);
  }

  getUpdateMessage() {
    if (this.alertMessages) {
      return this.alertMessages;
    }
    return null;
  }

  logout() {
    this.localStorageService.removeItem(LOCALSTORAGE_KEY.userInfo);
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    if (this.getToken()) {
      const expired = this.jwtHelperService.isTokenExpired(this.getToken());
      if (expired) {
        localStorage.clear();
      }
      return !expired;
    }
    return false;
  }

  override getToken() {
    return this.localStorageService.getItem<any>(LOCALSTORAGE_KEY.token);
  }

  checkSlugAndRole(slug: string, roleId: number): Observable<any> {
    return this._http.post(`http://localhost:3456/roles/checkSlugAndRole`, {
      slug,
      roleId,
    });
  }
}
