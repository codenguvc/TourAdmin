import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

interface Permission {
  name: string,
  slug: string,
}

@Component({
  selector: 'ngx-add-permissions',
  templateUrl: './add-permissions.component.html',
})

export class AddPermissionsComponent {
  constructor(private router: Router, private http: HttpClient) { }

  newPer: Permission = {
    name: '',
    slug: '',
  }

  addPer(perForm: any) {
    if (perForm.valid) {
      this.http.post(API_URLS.addPermissions, this.newPer, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
        .subscribe(
          (response) => {
            console.log('Per added successfully', response);
            Swal.fire({
              icon: 'success',
              title: 'Thêm quyền thành công!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/pages/permissions']);
          }, (error) => {
            console.error('Error adding Per:', error);

          }
        )
    }
  }
}
