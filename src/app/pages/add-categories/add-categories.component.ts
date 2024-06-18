import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

interface Category {
  name: string;
}

@Component({
  selector: 'ngx-categories',
  templateUrl: './add-categories.component.html',
})
export class AddCategoriesComponent {
  newCate: Category = {
    name: ''
  };

  constructor(private router: Router, private http: HttpClient) {}

  addCate(cateForm: any) {
    if (cateForm.valid) {
      this.http.post(API_URLS.addCate, this.newCate, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }).subscribe(
        (response) => {
          console.log('Category added successfully', response);
          Swal.fire({
            icon: 'success',
            title: 'Thêm danh mục thành công!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/pages/categories']);
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    }
  }
}
