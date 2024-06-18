import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
@NgModule({
  imports: [BreadcrumbModule],
  declarations: [OrdersComponent],
})
export class OrdersModule {}
