import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

interface Location {
  id: number;
  name: string;
  image: string;
  category_id: number;
}

@Component({
  selector: 'ngx-locations',
  templateUrl: './locations.component.html',
})
export class LocationsComponent implements OnInit {
  currentPage: number = 1;
  lastPage: number = 5;
  locations: Location[] = [];
  apiUrl = API_URLS.listPageCate;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLocations(this.currentPage);
  }

  fetchLocations(page: number): void {
    const url = `${API_URLS.listPageLocations}?page=${page}&limit=3`;
    this.http.get<any>(url, httpOptions).subscribe(
      (data: any) => {
        this.locations = data.data.map((locations: Location) => ({
          ...locations
        }))
        this.currentPage = data.current_page;
        this.lastPage = data.last_page;
      }, (error) => {
        console.error("Error fetching locations:", error);
      }
    );
  }

  onDataListChange(data: any): void {
    this.currentPage = data.current_page;
    this.lastPage = data.last_page;
    this.fetchLocations(this.currentPage);
  }

  navigateToAddLocation() {
    this.router.navigate(['/pages/add-locations']);
  }

  navigateToEditLocation(id: number) {
    this.router.navigate(['/pages/edit-locations', id]);
  }

  deleteLocation(id: string): void {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Bạn sẽ không thể khôi phục lại địa điểm này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa nó luôn!',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${API_URLS.deleteLoca.replace(':id', id)}`, httpOptions).subscribe(
          () => {
            Swal.fire('Đã xóa!', 'Địa điểm đã được xóa', 'success');
            this.fetchLocations(this.currentPage);
          }, (error) => {
            Swal.fire('Lỗi', 'Có lỗi xảy ra khi xóa địa điểm.', 'error');
            console.error('Error deleting location:', error);
          }
        );
      }
    });
  }
}