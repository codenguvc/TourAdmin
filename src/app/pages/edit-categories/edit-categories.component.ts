import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';


interface Categories {
  id?: number;
  name: string;
}


@Component({
  selector: 'ngx-categories',
  templateUrl: './edit-categories.component.html',
})
export class EditCategoriesComponent {

  editCategori: Categories = {
    name: '',
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.fetchCategories(id)
    })
  }

  fetchCategories(id: number): void {
    this.http.get<Categories>(`${API_URLS.getCateByID}/${id}`).subscribe(
      (data) => {
        this.editCategori = data;
      }, (error) => {
        console.error('Error fetching categori:', error);
      }
    )
  }

  CateForm(editCategoryForm: any) {
    this.http.post(`${API_URLS.editCate}`, this.editCategori).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Chỉnh sửa danh mục thành công!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/pages/categories']);
      }, (error) => {
        console.error('Error editing categori:', error);

      }
    )
  }
}
