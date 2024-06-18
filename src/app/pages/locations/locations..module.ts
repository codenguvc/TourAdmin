import { NgModule } from '@angular/core';
import { LocationsComponent } from './locations.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [LocationsComponent],
})
export class LocationsModule {}
