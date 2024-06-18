import { NgModule } from '@angular/core';
import { EditCategoriesComponent } from './edit-categories.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  imports: [CommonModule, FormsModule, BreadcrumbModule],
  declarations: [EditCategoriesComponent],
})
export class EditCategoriesModule {}
