import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

interface Permission {
  id: number;
  name: string;
  slug: string;
}

@Component({
  selector: 'ngx-add-role',
  templateUrl: './add-role.component.html',
})
export class AddRoleComponent implements OnInit {
  permissions: Permission[] = [];
  selectedPermissions: { [key: number]: boolean } = {};
  roleName: string = '';
  roleDescription: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchPermissions();
  }

  fetchPermissions() {
    this.http.get<Permission[]>(API_URLS.listPermissions).subscribe(
      (data) => {
        this.permissions = data;
      },
      (error) => {
        console.error('Đã xảy ra lỗi khi lấy danh sách quyền', error);
      }
    );
  }

  onSubmit() {
    const selectedPermissionIds = Object.keys(this.selectedPermissions)
      .filter((key) => this.selectedPermissions[+key])
      .map((key) => +key);

    const payload = {
      name: this.roleName,
      roleDescription: this.roleDescription,
      permissions: selectedPermissionIds,
    };

    this.http.post(API_URLS.addRoles, payload).subscribe(
      (response) => {
        console.log('Vai trò đã được thêm thành công', response);
        Swal.fire({
          icon: 'success',
          title: 'Thêm vai trò thành công!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/pages/roles']);
      },
      (error) => {
        console.error('Đã xảy ra lỗi', error);
      }
    );
  }
}
