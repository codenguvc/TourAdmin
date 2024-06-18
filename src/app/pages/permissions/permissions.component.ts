import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URLS } from '../../@core/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};

interface Permission {
  id: string;
  name: string;
  slug: string;
}

@Component({
  selector: 'ngx-permissions',
  templateUrl: './permissions.component.html',
})
export class PermissionsComponent implements OnInit {
  currentPage: number = 1;
  lastPage: number = 5;
  permissions: Permission[] = [];
  apiUrl = API_URLS.listPagePermissions;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPermissions(this.currentPage);
  }

  fetchPermissions(page: number): void {
    const url = `${API_URLS.listPagePermissions}?page=${page}&limit=5`;
    this.http.get<any>(url, httpOptions).subscribe(
      (data: any) => {
        this.permissions = data.data.map((permission: Permission) => ({
          ...permission
        }))
        this.currentPage = data.current_page;
        this.lastPage = data.last_page;
      },
      (error) => {
        console.error('Error fetching permissions:', error);
      }
    );
  }

  onDataListChange(data: any): void {
    this.currentPage = data.current_page;
    this.lastPage = data.last_page;
    this.fetchPermissions(this.currentPage);
  }

  deletePermission(id: string): void {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Bạn sẽ không thể khôi phục lại quyền này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa nó luôn!',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${API_URLS.deletePermissions.replace(':id', id)}`, httpOptions)
          .subscribe(
            () => {
              Swal.fire('Đã xóa!', 'Quyền đã được xóa', 'success');
              this.fetchPermissions(this.currentPage);
            },
            (error) => {
              Swal.fire(
                'Lỗi',
                'Quyền này đang được sử dụng, không thể xóa',
                'error'
              );
              console.error('Error deleting permission:', error);
            }
          );
      }
    });
  }

  navigateToAddPermissions() {
    this.router.navigate(['/pages/add-permissions']);
  }

  navigateToEditPermissions(id: string) {
    this.router.navigate(['/pages/edit-permissions', id]);
  }
}