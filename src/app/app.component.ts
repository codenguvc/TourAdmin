import { Component, OnInit } from '@angular/core';
import { LOCALSTORAGE_KEY, ROUTER_CONFIG } from './@core/config';
import Swal from 'sweetalert2';
import { AuthService } from './@core/services/apis';
import { LocalStorageService } from './@core/services/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        const userInfo = this.storageService.getItem(
          LOCALSTORAGE_KEY.userInfo
        ) as any;
        if(!userInfo) {
          return;
        }
        const roleId = userInfo?.role_id;

        if (!userInfo) {
          this.router.navigate(['/login']);
          return;
        }

        const url = event.urlAfterRedirects;
        const urlParts = url.split('/');
        const pageName = urlParts.length > 2 ? urlParts[2] : '';

        if (pageName === '' || pageName === 'dashboard') {
          return;
        }

        try {
          const response: any = await this.authService
            .checkSlugAndRole(pageName, roleId)
            .toPromise();

          if (!response.isValid) {
            await Swal.fire({
              icon: 'error',
              title: 'Unauthorized',
              text: 'Bạn không có quyền truy cập vào trang này!',
            });
            this.router.navigate(['/pages']);
          }
        } catch (error) {
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Có lỗi xảy ra!',
          });
          this.router.navigate(['/dashboard']);
        }
      }
    });
  }

  protected checkUrl() {
    const userSession = localStorage.getItem(LOCALSTORAGE_KEY.token);
    if (userSession) {
      const basePathRoute = location.pathname;
      if (basePathRoute.includes('/auth/login')) {
        this.router
          .navigate([ROUTER_CONFIG.pages], { replaceUrl: true })
          .then();
      }
    } else {
      this.router.navigate([ROUTER_CONFIG.auth.login]).then();
    }
  }
}
