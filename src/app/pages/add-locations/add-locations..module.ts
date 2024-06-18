import { NgModule } from '@angular/core';
import { AddLocationsComponent } from './add-locations.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [BreadcrumbModule, CommonModule],
  declarations: [AddLocationsComponent],
})
export class AddLocationsModule {}
