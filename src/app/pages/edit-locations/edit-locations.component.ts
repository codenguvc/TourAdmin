import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

interface Location {
  id: number;
  name: string;
  image: string;
  category_id: number;
}

@Component({
  selector: 'ngx-locations',
  templateUrl: './edit-locations.component.html',
})
export class EditLocationsComponent implements OnInit {
  @ViewChild('editLocationForm') editLocationForm: NgForm;

  location: Location = {
    id: 0,
    name: '',
    image: '',
    category_id: 0,
  };
  imageUrl: string | undefined;
  categories: any[] = [];

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.route.params.subscribe(params => {
      const locationId = +params['id'];
      if (locationId) {
        this.fetchLocationById(locationId);
      }
    });
  }

  fetchCategories(): void {
    this.http.get<any[]>(API_URLS.listCate).subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  fetchLocationById(id: number): void {
    this.http.get<Location>(`${API_URLS.getLocaByID}/${id}`).subscribe(
      (data) => {
        this.location = data;

        if (data.image) {
          this.imageUrl = `http://127.0.0.1:3456/uploads/${data.image}`;
        } else {
          this.imageUrl = '';
        }
      },
      (error) => {
        console.error('Error fetching location:', error);
      }
    );
  }

  onSubmit() {
    if (this.editLocationForm.valid) {
      const requestBody = {
        id: this.location.id,
        name: this.location.name,
        category_id: this.location.category_id,
        image: this.location.image,
      };

      const fileInput = document.getElementById('locationImage') as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        const formData = new FormData();
        formData.append('id', this.location.id.toString());
        formData.append('name', this.location.name);
        formData.append('category_id', this.location.category_id.toString());
        formData.append('image', fileInput.files[0]);
        this.http.post(API_URLS.editLoca, formData).subscribe(
          (response) => {
            console.log('Location updated successfully', response);
            Swal.fire({
              icon: 'success',
              title: 'Chỉnh sửa địa điểm thành công!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/pages/locations']);
          },
          (error) => {
            console.error('Error updating location:', error);
          }
        );
      } else {
        this.http.post(API_URLS.editLoca, requestBody).subscribe(
          (response) => {
            console.log('Location updated successfully', response);
            Swal.fire({
              icon: 'success',
              title: 'Chỉnh sửa địa điểm thành công!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/pages/locations']);
          },
          (error) => {
            console.error('Error updating location:', error);
          }
        );
      }
    }
  }
  previewImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
