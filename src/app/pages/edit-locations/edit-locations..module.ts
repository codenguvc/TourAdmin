import { NgModule } from '@angular/core';
import { EditLocationsComponent } from './edit-locations.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [BreadcrumbModule, CommonModule],
  declarations: [EditLocationsComponent],
})
export class EditLocationsModule {}
