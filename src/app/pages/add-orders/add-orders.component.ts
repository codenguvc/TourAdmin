import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

interface Order {
  id: number;
  tour_id: number;
  customer_id: number;
  customer_name: string;
  customer_email: string;
  booking_date: string;
  total_price: number;
}

interface Tour {
  id: number;
  name: string;
  location_id: number;
  start_date: string;
  end_date: string;
  price: number;
  description: string;
}

interface Customer {
  id: number;
  name: string;
  customer_email: string;
}

@Component({
  selector: 'ngx-orders',
  templateUrl: './add-orders.component.html',
})
export class AddOrdersComponent implements OnInit {
  newOrder: Order = {
    id: 0,
    tour_id: 0,
    customer_id: 0,
    customer_name: '',
    booking_date: new Date().toISOString().split('T')[0],
    total_price: 0,
    customer_email: ''
  };

  tours: Tour[] = [];
  customers: Customer[] = [];
  orders: Order[] = [];
  submitting: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchTours();
    this.fetchCustomers();
    this.fetchOrders();
  }

  fetchTours() {
    this.http.get<Tour[]>(API_URLS.listTours).subscribe(
      (data) => (this.tours = data),
      (error) => console.error('Failed to fetch tours:', error)
    );
  }

  fetchCustomers() {
    this.http.get<Customer[]>(API_URLS.listCustomers).subscribe(
      (data) => {
        this.customers = data;
      },
      (error) => console.error('Failed to fetch customers:', error)
    );
  }

  fetchOrders() {
    this.http.get<Order[]>(API_URLS.listOrders).subscribe(
      (data) => (this.orders = data),
      (error) => console.error('Failed to fetch orders:', error)
    );
  }

  onTourChange() {
    const selectedTour = this.tours.find(tour => tour.id === this.newOrder.tour_id);
    if (selectedTour) {
      console.log('Selected tour price:', selectedTour.price); 
      this.newOrder.total_price = selectedTour.price;
    }
  }

  onCustomerChange() {
    const selectedCustomer = this.customers.find(customer => customer.id === this.newOrder.customer_id);
    if (selectedCustomer) {
      this.newOrder.customer_name = selectedCustomer.name;
      this.newOrder.customer_email = selectedCustomer.customer_email;
    }
  }

  addOrder(orderForm: any): void {
    if (orderForm.valid && !this.submitting) {
      this.submitting = true;
      this.http.post<Order>(API_URLS.addOrders, this.newOrder).subscribe(
        (response) => {
          console.log('Order added:', response);
          this.orders.push(response);
          this.submitting = false;
          Swal.fire({
            icon: 'success',
            title: 'Thêm đơn hàng thành công!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['pages/orders']);
this.resetForm(orderForm);
        },
        (error) => {
          console.error('Failed to add order:', error);
          this.submitting = false;
          alert('Failed to add order. Please try again later.');
        }
      );
    }
  }

  resetForm(form: any): void {
    form.resetForm();
    this.newOrder = {
      id: 0,
      tour_id: 0,
      customer_id: 0,
      customer_name: '',
      booking_date: new Date().toISOString().split('T')[0],
      total_price: 0,
      customer_email: ''
    };
  }
}