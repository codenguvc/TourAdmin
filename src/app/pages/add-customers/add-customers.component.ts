import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

interface Customer {
  name: string;
  phone: string;
}

@Component({
  selector: 'ngx-customers',
  templateUrl: './add-customers.component.html',
})
export class AddCustomersComponent {

  constructor(private router: Router, private http: HttpClient) {}

  newCustomer: Customer = {
    name: '',
    phone: '',
  };

  addCus(cusForm: any) {
    if (cusForm.valid) {
      this.http
        .post(API_URLS.addCustomers, this.newCustomer, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        })
        .subscribe(
          (response) => {
            console.log('Customer added successfully', response);
            Swal.fire({
              icon: 'success',
              title: 'Thêm khách hàng thành công!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/pages/customers']);
          },
          (error) => {
            console.error('Error adding account:', error);
          }
        );
    }
  }
}
