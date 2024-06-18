import { NgModule } from '@angular/core';
import { EditCustomersComponent } from './edit-customers.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
@NgModule({
  imports: [BreadcrumbModule],
  declarations: [EditCustomersComponent],
})
export class CustomersModule {}
