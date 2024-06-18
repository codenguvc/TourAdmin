import { NgModule } from '@angular/core';
import { AddCategoriesComponent } from './add-categories.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  imports: [CommonModule, FormsModule, BreadcrumbModule],
  declarations: [AddCategoriesComponent],
})
export class AddCategoriesModule {}
