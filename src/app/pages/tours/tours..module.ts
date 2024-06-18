import { NgModule } from '@angular/core';
import { ToursComponent } from './tours.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
@NgModule({
  imports: [BreadcrumbModule],
  declarations: [ToursComponent],
})
export class ToursModule {}
