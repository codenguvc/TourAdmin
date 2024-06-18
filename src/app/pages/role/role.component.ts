import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

interface Role {
  id: number;
  name: string;
}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Component({
  selector: 'ngx-roles',
  templateUrl: './role.component.html',
})
export class RoleComponent implements OnInit {
  currentPage: number = 1;
  lastPage: number = 5;
  roles: Role[] = [];
  apiUrl = API_URLS.listPageRoles;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchRoles(this.currentPage);
  }

  fetchRoles(page: number): void {
    const url = `${API_URLS.listPageRoles}?page=${page}&limit=5`;
    this.http.get<any>(url, httpOptions).subscribe(
      (data: any) => {
        this.roles = data.data.map((role: Role) => ({
          ...role
        }))
        this.currentPage = data.current_page;
        this.lastPage = data.last_page;
      },
      (error) => {
        console.error('Đã xảy ra lỗi khi lấy danh sách vai trò', error);
      }
    );
  }

  onDataListChange(data: any): void {
    this.currentPage = data.current_page;
    this.lastPage = data.last_page;
    this.fetchRoles(this.currentPage);
  }

  navigateToAddRole() {
    this.router.navigate(['/pages/add-role']);
  }

  navigateToEditRole(id: number) {
    this.router.navigate(['/pages/edit-role', id]);
  }

  confirmDelete(id: string) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Bạn sẽ không thể khôi phục lại role này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa nó luôn!',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`${API_URLS.deleteRoles.replace(':id', id)}`, httpOptions)
          .subscribe(
            () => {
              Swal.fire('Đã xóa!', 'Role đã được xóa.', 'success');
              this.fetchRoles(this.currentPage);
            },
            (error) => {
              Swal.fire('Lỗi!', 'Có lỗi xảy ra khi xóa role.', 'error');
              console.error('Error deleting account:', error);
            }
          );
      }
    });
  }
}