import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

interface Account {
  id: number;
  email: string;
  username: string;
  password: string;
  role_id: string;
  role_name?: string;
}

interface Role {
  id: string;
  name: string;
}

@Component({
  selector: 'ngx-customers',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  currentPage: number = 1;
  lastPage: number = 1;
  accounts: Account[] = [];
  roles: Role[] = [];
  apiUrl = API_URLS.listUsers;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRoles();
  }

  fetchRoles(): void {
    this.http.get<Role[]>(API_URLS.listRoles, httpOptions).subscribe(
      (roles: Role[]) => {
        this.roles = roles;
        this.fetchAccounts(this.currentPage);
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  fetchAccounts(page: number): void {
    const url = `${API_URLS.listUsers}?page=${page}&limit=5`;
    this.http.get<any>(url, httpOptions).subscribe(
      (data: any) => {
        this.accounts = data.data.map((account: Account) => ({
          ...account,
          role_name: this.getRoleName(account.role_id),
        }));
        this.currentPage = data.current_page;
        this.lastPage = data.last_page;
      },
      (error) => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  getRoleName(role_id: string): string {
    const role = this.roles.find(role => role.id === role_id);
    return role ? role.name : '';
  }

  deleteAccount(id: string): void {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Bạn sẽ không thể khôi phục lại tài khoản này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa nó luôn!',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {

        this.http.delete(`${API_URLS.deleteUsers.replace(':id', id)}`, httpOptions).subscribe(
          () => {
            Swal.fire('Đã xóa!', 'Tài khoản đã được xóa.', 'success');
            this.fetchAccounts(this.currentPage);
          },
          (error) => {
            if (error.status === 403) {
              Swal.fire('Lỗi!', 'Không thể xóa tài khoản chính này.', 'error');
            } else {
              Swal.fire('Lỗi!', 'Có lỗi xảy ra khi xóa tài khoản.', 'error');
            }
            console.error('Error deleting account:', error);
          }
        );
      }
    });
  }


  navigateToAddAccount() {
    this.router.navigate(['/pages/add-accounts']);
  }

  navigateToEditAccount(id: string) {
    this.router.navigate(['/pages/edit-accounts', id]);
  }

  onDataListChange(data: any): void {
    this.currentPage = data.current_page;
    this.lastPage = data.last_page;
    this.fetchAccounts(this.currentPage);
  }

  getMaskedPassword(password: string): string {
    return '*'.repeat(password.length);
  }
}
