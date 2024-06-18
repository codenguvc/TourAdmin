import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
@NgModule({
  imports: [BreadcrumbModule],
  declarations: [AccountComponent],
})
export class AccountModule {}
