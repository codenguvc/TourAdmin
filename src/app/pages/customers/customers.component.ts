import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

interface Customer {
  id: string;
  name: string;
  sdt: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};

@Component({
  selector: 'ngx-customers',
  templateUrl: './customers.component.html',
})
export class CustomersComponent {
  currentPage: number = 1;
  lastPage: number = 5;
  customers: Customer[] = [];
  apiUrl = API_URLS.listPageCustomer

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCustomer(this.currentPage);
  }

  fetchCustomer(page: number): void {
    const url = `${API_URLS.listPageCustomer}?page=${page}&limit=5`;
    this.http.get<any>(url, httpOptions).subscribe(
      (data: any) => {
        this.customers = data.data.map((customers: Customer) => ({
          ...customers
        }))
        this.currentPage = data.current_page;
        this.lastPage = data.last_page;
      },
      (error) => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  onDataListChange(data: any): void {
    this.currentPage = data.current_page;
    this.lastPage = data.last_page;
    this.fetchCustomer(this.currentPage);
  }

  deleteCustomer(id: string): void {
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
        this.http.delete(`${API_URLS.deleteCustomers.replace(':id', id)}`, httpOptions).subscribe(
          () => {
            Swal.fire('Đã xóa!', 'Tài khoản đã được xóa.', 'success');
            this.fetchCustomer(this.currentPage);
          },
          (error) => {
            Swal.fire('Lỗi!', 'Có lỗi xảy ra khi xóa tài khoản.', 'error');
            console.error('Error deleting account:', error);
          }
        );
      }
    });
  }

  navigateToAddCustomers() {
    this.router.navigate(['/pages/add-customers']);
  }
  navigateToEditCustomers(id: string) {
    this.router.navigate(['/pages/edit-customers', id]);
  }
}