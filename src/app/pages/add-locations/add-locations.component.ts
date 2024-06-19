import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { API_URLS } from '../../@core/environments/environment';

@Component({
  selector: 'ngx-locations',
  templateUrl: './add-locations.component.html',
})
export class AddLocationsComponent implements OnInit {
  @ViewChild('locationForm') locationForm: NgForm;

  newLocation: {
    locationName: string,
    category_id: string
  } = { locationName: '', category_id: '' };

  imageUrl: string | undefined;
  imageSelected: boolean = false;

  categories: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCategories();
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

  onSubmit() {
    if (this.locationForm.valid && this.imageSelected) { // Kiểm tra imageSelected trong onSubmit
      const formData = new FormData();
      formData.append('locationName', this.newLocation.locationName);
      formData.append('category_id', this.newLocation.category_id);

      const fileInput = document.getElementById('locationImage') as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        formData.append('image', fileInput.files[0]);
      }

      this.http.post(API_URLS.addLoca, formData).subscribe(
        (response) => {
          console.log('Location added successfully', response);
          Swal.fire({
            icon: 'success',
            title: 'Thêm địa điểm thành công!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/pages/locations']);
        },
        (error) => {
          console.error('Error adding location:', error);
        }
      );
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
      this.imageSelected = true;
    }
  }
}
