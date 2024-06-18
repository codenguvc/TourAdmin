import { NgModule } from '@angular/core';
import { AddCustomersComponent } from './add-customers.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
@NgModule({
  imports: [BreadcrumbModule],
  declarations: [AddCustomersComponent],
})
export class CustomersModule {}
