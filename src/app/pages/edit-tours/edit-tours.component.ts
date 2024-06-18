import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';


interface Tour {
  id?: number;
  name: string;
  location_id: number;
  start_date: string;
  end_date: string;
  price: number;
  description: string;
}

interface Location {
  id: number;
  name: string;
  image: string;
  category_id?: number;
}

@Component({
  selector: 'ngx-edit-tour',
  templateUrl: './edit-tours.component.html',
})
export class EditToursComponent implements OnInit {
  editTour: Tour = {
    name: '',
    location_id: 0,
    start_date: '',
    end_date: '',
    price: 0,
    description: '',
  };

  locations: Location[] = [];
  startDateError: string = '';
  endDateError: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.fetchTourData(id);
      this.fetchLocations();
    });
  }

  fetchLocations(): void {
    this.http.get<Location[]>(API_URLS.listLoca).subscribe(
      (data) => {
        this.locations = data;
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  fetchTourData(id: number): void {
    this.http.get<Tour>(`${API_URLS.getToursByID}/${id}`).subscribe(
      (data) => {
        this.editTour = {
          ...data,
          start_date: this.formatDate(data.start_date),
          end_date: this.formatDate(data.end_date)
        };
      },
      (error) => {
        console.error('Error fetching tour:', error);
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
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

  submitEdit(tourForm: NgForm): void {
    this.validateDates(tourForm);
    if (!this.startDateError && !this.endDateError) {
      this.http.post(API_URLS.editTours, this.editTour, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }).subscribe(
        (response) => {
          console.log('Tour edited successfully', response);
          Swal.fire({
            icon: 'success',
            title: 'Chỉnh sửa chuyến đi thành công!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/pages/tours']);
        },
        (error) => {
          console.error('Error editing tour:', error);
        }
      );
    }
  }
}
