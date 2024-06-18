import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

import { API_URLS } from '../../@core/environments/environment';

interface Order {
  id: number;
  tour_name: string;
  customer_id: number;
  customer_name: string;
  customer_email: string;
  booking_date: Date;
  total_price: number;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
}

@Component({
  selector: 'ngx-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  currentPage: number = 1;
  lastPage: number = 5;
  customersMap: Map<number, Customer> = new Map();

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.http.get<Order[]>(API_URLS.listOrders).subscribe(
      (data) => {
        this.orders = data;
        this.fetchCustomerNames();
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  fetchCustomerNames() {
    const customerIds = this.orders.map(order => order.customer_id)
      .filter((value, index, self) => self.indexOf(value) === index);

    const customerApiUrl = API_URLS.getCustomersByID;

    const fetchPromises = customerIds.map(customerId => {
      return this.http.get<Customer>(`${customerApiUrl}/${customerId}`)
        .toPromise()
        .then((customer) => {
          this.customersMap.set(customerId, customer);
        })
        .catch((error) => {
          console.error(`Error fetching customer details for ID ${customerId}:`, error);
          this.customersMap.set(customerId, { id: customerId, name: 'Unknown', phone: '' });
        });
    });

    Promise.all(fetchPromises).then(() => {
      this.orders = this.orders.map(order => ({
        ...order,
        customer_name: this.customersMap.get(order.customer_id)?.name || 'Unknown'
      }));
    });
  }

  navigateToAddLocation() {
    this.router.navigate(['/pages/add-orders']);
  }
  exportOrder(id: string) {
    this.router.navigate(['/pages/bill', id]);
  }
  deleteOrder(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Bạn sẽ không thể khôi phục lại đơn hàng này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa nó luôn!',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${API_URLS.deleteOrders.replace(':id', id.toString())}`).subscribe(
          () => {
            Swal.fire('Đã xóa!', 'Đơn hàng đã được xóa.', 'success');
            this.fetchOrders();
          },
          (error) => {
            Swal.fire('Lỗi!', 'Có lỗi xảy ra khi xóa đơn hàng.', 'error');
            console.error('Error deleting order:', error);
          }
        );
      }
});
  }
}