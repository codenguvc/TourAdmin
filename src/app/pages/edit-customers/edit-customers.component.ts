import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

interface Customer {
  id?: number;
  name: string;
  phone: string;
}

@Component({
  selector: 'ngx-customers',
  templateUrl: './edit-customers.component.html',
})
export class EditCustomersComponent {
  editCustomer: Customer = {
    name: '',
    phone: '',
  };

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.fetchCustomerData(id);
    });
  }

  fetchCustomerData(id: number): void {
    this.http.get<Customer>(`${API_URLS.getCustomersByID}/${id}`).subscribe(
      (data) => {
        this.editCustomer = data;
      },
      (error) => {
        console.error('Error fetching account:', error);
      }
    );
  }

  editCus(cusForm: any) {
    this.http.post(`${API_URLS.editCustomers}`, this.editCustomer).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Chỉnh sửa khách hàng thành công!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/pages/customers']);
      },
      (error) => {
        console.error('Error editing customers:', error);
      }
    );
  }
}
