import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

interface Permission {
  id: number;
  name: string;
  slug: string;
}

@Component({
  selector: 'ngx-edit-role',
  templateUrl: './edit-role.component.html',
})
export class EditRoleComponent implements OnInit {
  editedRole: any = {};
  permissions: Permission[] = [];
  selectedPermissions: { [key: number]: boolean } = {};
  selectedPermissionIds: number[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const roleId = parseInt(params['id']);
      this.fetchRole(roleId);
      this.fetchPermissions();
    });
  }

  fetchRole(roleId: number) {
    this.http
      .get<any>(`${API_URLS.getRolesByID}/${roleId}`)
      .subscribe(
        (data) => {
          this.editedRole = data;
          this.editedRole.permissions.forEach((permission: any) => {
            this.selectedPermissions[permission.permission_id] = true;
          });
          this.selectedPermissionIds = this.editedRole.permissions.map(
            (permission: any) => permission.permission_id
          );
          this.updateSelectedPermissions();
        },
        (error) => {
          console.error('Đã xảy ra lỗi khi lấy thông tin vai trò', error);
        }
      );
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

  updateSelectedPermissions() {
    this.selectedPermissions = {};
    this.selectedPermissionIds.forEach((permissionId: number) => {
      this.selectedPermissions[permissionId] = true;
    });
  }

  togglePermission(permissionId: number) {
    const index = this.selectedPermissionIds.indexOf(permissionId);
    if (index === -1) {
      this.selectedPermissionIds.push(permissionId);
    } else {
      this.selectedPermissionIds.splice(index, 1);
    }
  }

  onSubmit() {
    const payload = {
      id: this.editedRole.id,
      name: this.editedRole.name,
      description: this.editedRole.description,
      permissions: this.selectedPermissionIds,
    };

    this.http.post(`${API_URLS.editRoles}/${this.editedRole.id}`, payload).subscribe(
      (response) => {
        console.log('Vai trò đã được chỉnh sửa thành công', response);
        Swal.fire({
          icon: 'success',
          title: 'Chỉnh sửa vai trò thành công!',
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
