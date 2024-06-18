import { NgModule } from '@angular/core';
import { AddAccountComponent } from './add-account.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
@NgModule({
  imports: [BreadcrumbModule],
  declarations: [AddAccountComponent],
})
export class AccountModule {}
