import { NgModule } from '@angular/core';
import { CustomersComponent } from './customers.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
@NgModule({
  imports: [BreadcrumbModule],
  declarations: [CustomersComponent],
})
export class CustomersModule {}
