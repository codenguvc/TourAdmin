import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';




interface Account {
  account_id?: number;
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
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
})
export class EditAccountComponent implements OnInit {
  editedAccount: Account = {
    email: '',
    username: '',
    password: '',
    role_id: '',
  };

  roles: Role[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.fetchAccountData(id);
      this.fetchRoles();
    });
  }

  fetchRoles(): void {
    this.http.get<Role[]>(API_URLS.listRoles).subscribe(
      (roles: Role[]) => {
        this.roles = roles;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  fetchAccountData(id: number): void {
    this.http.get<Account>(`${API_URLS.getUsersByID}/${id}`).subscribe(
      (data) => {
        this.editedAccount = {
          ...data,
          role_name: this.getRoleName(data.role_id),
        };
      },
      (error) => {
        console.error('Error fetching account:', error);
      }
    );
  }

  getRoleName(role_id: string): string {
    const role = this.roles.find(role => role.id === role_id);
    return role ? role.name : '';
  }

  editAccount(): void {
    this.http.post(`${API_URLS.editUsers}`, this.editedAccount).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Chỉnh sửa tài khoản thành công!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/pages/accounts']);
      },
      (error) => {
        console.error('Error editing account:', error);
      }
    );
  }
}
