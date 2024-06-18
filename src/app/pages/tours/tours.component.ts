import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


interface Tour {
  id: number;
  name: string;
  location_id?: number;
  start_date?: string;
  end_date?: string;
  price?: number;
  description?: string;
}

interface Location {
  id: number;
  name: string;
  image: string;
  category_id?: number;
}

@Component({
  selector: 'ngx-tours',
  templateUrl: './tours.component.html',
})
export class ToursComponent implements OnInit {
  currentPage: number = 1;
  lastPage: number = 5;
  tours: Tour[] = [];
  locations: Location[] = [];
  apiUrl = API_URLS.listPageTours;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLocations();
  }

  fetchLocations(): void {
    this.http.get<Location[]>(API_URLS.listLoca, httpOptions).subscribe(
      (locations: Location[]) => {
        this.locations = locations;
        this.fetchTours(this.currentPage);
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  fetchTours(page: number): void {
    const url = `${API_URLS.listPageTours}?page=${page}&limit=5`;
    this.http.get<any>(url, httpOptions).subscribe(
      (data: any) => {
        this.tours = data.data.map((tours: Tour) => ({
          ...tours
        }))
        this.currentPage = data.current_page;
        this.lastPage = data.last_page;
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
  }

  onDataListChange(data: any): void {
    this.currentPage = data.current_page;
    this.lastPage = data.last_page;
    this.fetchTours(this.currentPage);
  }

  deleteTour(id: string): void {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Bạn sẽ không thể khôi phục lại tour này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa nó luôn!',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${API_URLS.deleteTours.replace(':id', id)}`, httpOptions).subscribe(
          () => {
            Swal.fire('Đã xóa!', 'Tour đã được xóa.', 'success');
            this.fetchTours(this.currentPage);
          },
          (error) => {
            Swal.fire('Lỗi!', 'Có lỗi xảy ra khi xóa tour.', 'error');
            console.error('Error deleting tour:', error);
          }
        );
      }
    });
  }

  navigateToAddTour(): void {
    this.router.navigate(['/pages/add-tours']);
  }

  navigateToEditTour(id: number): void {
    this.router.navigate(['/pages/edit-tours', id]);
  }
  getLocationName(location_id?: number): string {
    const location = this.locations.find(loc => loc.id === location_id);
    return location ? location.name : 'Unknown';
  }
}