import { NgModule } from '@angular/core';
import { AddToursComponent } from './add-tours.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BreadcrumbModule, FormsModule],
  declarations: [AddToursComponent],
})
export class ToursModule {}
