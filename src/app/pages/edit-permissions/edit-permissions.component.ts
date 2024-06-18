import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';


interface Permission {
  id?: number;
  name: string;
  slug: string;
}

@Component({
  selector: 'ngx-edit-permissions',
  templateUrl: './edit-permissions.component.html',
})
export class EditPermissionsComponent implements OnInit {
  editPer: Permission = {
    name: '',
    slug: ''
  };

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.fetchPer(id);
    });
  }

  fetchPer(id: number): void {
    this.http.get<Permission>(`${API_URLS.getPermissionsByID}/${id}`).subscribe(
      (data) => {
        this.editPer = data;
      },
      (error) => {
        console.error('Error fetching permission:', error);
      }
    );
  }

  saveEditedPermission(editForm: any): void {
    if (editForm.valid) {
      this.http.post(`${API_URLS.editPermissions}`, this.editPer, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Chỉnh sửa vai trò thành công!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/pages/permissions']);
        },
        (error) => {
          console.error('Error editing permission:', error);
        }
      );
    }
  }
}
