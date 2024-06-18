import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CategoriesComponent],
})
export class CategoriesModule {}
