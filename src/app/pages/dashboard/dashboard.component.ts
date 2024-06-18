import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../../@core/environments/environment';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  totalOrderPrice: number = 0;
  totalAmountCustomer: number = 0;
  totalAmountOrder: number = 0;
  ordersByLocation: any[] = [];
  revenueByLocation: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any>(API_URLS.dashboards).subscribe((response) => {
      this.totalOrderPrice = response.total;
    });

    this.http.get<any>(API_URLS.amountCus).subscribe((response) => {
      this.totalAmountCustomer = response.total;
    });

    this.http.get<any>(API_URLS.amountOrder).subscribe((response) => {
      this.totalAmountOrder = response.total;
    });

    this.http.get<any>(API_URLS.orderByLocation).subscribe((response) => {
      this.ordersByLocation = response.data;
    });

    this.http.get<any>(API_URLS.revenueByLocations).subscribe((response) => {
      this.revenueByLocation = response.data.filter(location => location.revenue_percentage !== null);
    });
  }
}
