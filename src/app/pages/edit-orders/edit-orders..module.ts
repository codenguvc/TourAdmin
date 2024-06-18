import { NgModule } from '@angular/core';
import { EditOrdersComponent } from './edit-orders.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
@NgModule({
  imports: [BreadcrumbModule],
  declarations: [EditOrdersComponent],
})
export class EditOrdersModule {}
