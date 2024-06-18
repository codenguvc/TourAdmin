import { NgModule } from '@angular/core';
import { AddOrdersComponent } from './add-orders.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
@NgModule({
  imports: [BreadcrumbModule],
  declarations: [AddOrdersComponent],
})
export class AddOrdersModule {}
