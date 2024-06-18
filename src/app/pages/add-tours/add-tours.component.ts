import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

interface Tour {
  name: string;
  location_id: number;
  start_date: string;
  end_date: string;
  price: number;
  description: string;
}

@Component({
  selector: 'ngx-add-tour',
  templateUrl: './add-tours.component.html',
})
export class AddToursComponent implements OnInit {
  newTour: Tour = {
    name: '',
    location_id: 0,
    start_date: '',
    end_date: '',
    price: 0,
    description: '',
  };

  locations: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLocations();
  }

  fetchLocations(): void {
    this.http.get<any[]>(API_URLS.listLoca).subscribe(
      (data) => {
        this.locations = data;
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/pages/tours']);
  }

  validateDates(form: NgForm): void {
    const currentDate = new Date().toISOString().split('T')[0];
    const startDate = form.controls.startDate.value;
    const endDate = form.controls.endDate.value;

    if (startDate < currentDate) {
      form.controls.startDate.setErrors({ invalidStartDate: true });
    } else {
      form.controls.startDate.setErrors(null);
    }

    if (endDate < startDate) {
      form.controls.endDate.setErrors({ invalidEndDate: true });
    } else {
      form.controls.endDate.setErrors(null);
    }
  }

  validateLocation(form: NgForm): void {
    const locationId = form.controls.locationId.value;
    if (!locationId || locationId === 0) {
      form.controls.locationId.setErrors({ required: true });
    } else {
      form.controls.locationId.setErrors(null);
    }
  }

  addTour(formData: NgForm): void {
    this.validateDates(formData);
    this.validateLocation(formData);
    if (formData.valid) {
      this.http.post(API_URLS.addTours, this.newTour, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }).subscribe(
        (response) => {
          console.log('Tour added successfully', response);
          Swal.fire({
            icon: 'success',
            title: 'Thêm chuyến đi thành công!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/pages/tours']);
        },
        (error) => {
          console.error('Error adding tour:', error);
        }
      );
    }
  }
}
