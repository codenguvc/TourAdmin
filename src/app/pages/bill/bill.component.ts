import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../../@core/environments/environment';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

interface Order {
  id: number;
  tour_id: number;
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

interface Tour {
  id: number;
  name: string;
}

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  order: Order | null = null;
  customer: Customer | null = null;
  tour: Tour | null = null;
  @ViewChild('content') content!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const orderId = params['id'];
      if (orderId) {
        this.fetchOrderById(orderId);
      }
    });
  }

  fetchOrderById(orderId: number) {
    this.http.get<Order>(`${API_URLS.getOrdersByID}/${orderId}`).subscribe(
      (order) => {
        this.order = order;
        this.fetchCustomerById(order.customer_id);
        this.fetchTourById(order.tour_id); // Fetch tour details
      },
      (error) => {
        console.error('Error fetching order:', error);
      }
    );
  }

  fetchCustomerById(customerId: number) {
    this.http.get<Customer>(`${API_URLS.getCustomersByID}/${customerId}`).subscribe(
      (customer) => {
        this.customer = customer;
        if (this.order) {
          this.order.customer_name = customer.name;
        }
      },
      (error) => {
        console.error(`Error fetching customer details for ID ${customerId}:`, error);
        if (this.order) {
          this.order.customer_name = 'Unknown';
        }
      }
    );
  }

  fetchTourById(tourId: number) {
    this.http.get<Tour>(`${API_URLS.getToursByID}/${tourId}`).subscribe(
      (tour) => {
        this.tour = tour;
        if (this.order) {
          this.order.tour_name = tour.name;
        }
      },
      (error) => {
        console.error(`Error fetching tour details for ID ${tourId}:`, error);
        if (this.order) {
          this.order.tour_name = 'Unknown';
        }
      }
    );
  }

  downloadPDF() {
    if (this.content) {
      const doc = new jspdf.jsPDF({
        orientation: 'p', // 'p' for portrait, 'l' for landscape
        unit: 'mm',
        format: 'a4'
      });

      html2canvas(this.content.nativeElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 180; // Adjusted width of the content in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const x = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
        const y = (doc.internal.pageSize.getHeight() - imgHeight) / 2;

        doc.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        
        doc.save('file.pdf');
      });
    }
  }
}
