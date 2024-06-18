import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};


interface Categories {
  id: string,
  name: string,
}

@Component({
  selector: 'ngx-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  currentPage: number = 1;
  lastPage: number = 5;
  categories: Categories[] = [];
  apiUrl = API_URLS.listPageCate

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCategories(this.currentPage)
  }

  fetchCategories(page: number): void {
    const url = `${API_URLS.listPageCate}?page=${page}&limit=5`;
    this.http.get<any>(url, httpOptions).subscribe(
      (data: any) => {
        this.categories = data.data.map((categories: Categories) => ({
          ...categories
        }))
        this.currentPage = data.current_page;
        this.lastPage = data.last_page;
      }, (error) => {
        console.error("Error fetching accounts:", error);

      }
    )
  }

  onDataListChange(data: any): void {
    this.currentPage = data.current_page;
    this.lastPage = data.last_page;
    this.fetchCategories(this.currentPage);
  }

  deleteCategori(id: string): void {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Bạn sẽ không thể khôi phục lại danh mục này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa nó luôn!',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${API_URLS.deleteCate.replace(':id', id)}`, httpOptions).subscribe(
          () => {
            Swal.fire('Đã xóa!', 'Danh mục đã được xóa', 'success');
            this.fetchCategories(this.currentPage);
          },
          (error) => {
            Swal.fire('Lỗi', 'Danh mục đã tồn tại ở bảng khác', 'error');
            console.error('Error deleting category:', error);
          }
        );
      }
    });
  }


  navigateToAddCategories() {
    this.router.navigate(['/pages/add-categories']);
  }
  navigateToEditCategories(id: string) {
    this.router.navigate(['/pages/edit-categories', id]);
  }

}