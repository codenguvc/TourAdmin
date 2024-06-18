import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/apis';
import { ROUTER_CONFIG } from '../config';
import { LocalStorageService } from '../services/common';
import { LOCALSTORAGE_KEY } from '../config';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private storageService: LocalStorageService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const userInfo = this.storageService.getItem(
      LOCALSTORAGE_KEY.userInfo
    ) as any;
    const roleId = userInfo?.role_id;

    if (!userInfo) {
      this.router.navigate(['/login']);
      return false;
    }

    const url = state.url;
    const urlParts = url.split('/');
    const pageName = urlParts.length > 2 ? urlParts[2] : '';

    if (pageName === '' || pageName === 'dashboard') {
      return true;
    }
    try {
      const response: any = await this.authService
        .checkSlugAndRole(pageName, roleId)
        .toPromise();

      if (response.isValid) {
        return true;
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'Bạn không có quyền truy cập vào trang này!',
        });
        this.router.navigate(['/pages']);
        return false;
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Có lỗi xảy ra!',
      });
      this.router.navigate(['/dashboard']);
      return false;
    }
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.canActivate(route, state);
  }
}
