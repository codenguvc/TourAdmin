import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Order {
  order_id: number;
  tour_id: number;
  customer_name: string;
  customer_email: string;
  booking_date: Date;
  total_price: number;
}

interface Tour {
  tour_id: number;
  tour_name: string;
}

@Component({
  selector: 'ngx-edit-orders',
  templateUrl: './edit-orders.component.html',
})
export class EditOrdersComponent {
  @Output() updateOrder: EventEmitter<any> = new EventEmitter();
  tours: Tour[] = [
    { tour_id: 1, tour_name: 'Tour A' },
    { tour_id: 2, tour_name: 'Tour B' },
    { tour_id: 3, tour_name: 'Tour C' },
  ];

  orderData = {
    order_id: 1,
    tour_id: 2,
    customer_name: 'John Doe',
    customer_email: 'john@example.com',
    booking_date: new Date('2024-05-01'),
    total_price: '200.000',
  };

  constructor(private router: Router) {}

  onSubmit() {}

  isValidOrderData() {}

  editOrder(orderForm: any) {

  }
}
