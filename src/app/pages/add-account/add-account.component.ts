import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

interface Account {
  email: string;
  username: string;
  password: string;
  role_id: string;
}

@Component({
  selector: 'ngx-customers',
  templateUrl: './add-account.component.html',
})
export class AddAccountComponent implements OnInit {
  newAccount: Account = {
    email: '',
    username: '',
    password: '',
    role_id: '',
  };

  roles: any[] = [];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchRoles();
  }

  fetchRoles(): void {
    this.http.get<any[]>(API_URLS.listRoles).subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  addAccount(accountForm: any) {
    if (accountForm.valid) {
      this.http
        .post(API_URLS.addUsers, this.newAccount, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        })
        .subscribe(
          (response) => {
            console.log('Account added successfully', response);
            Swal.fire({
              icon: 'success',
              title: 'Thêm tài khoản thành công!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/pages/accounts']);
          },
          (error) => {
            console.error('Error adding account:', error);
          }
        );
    }
  }
}
