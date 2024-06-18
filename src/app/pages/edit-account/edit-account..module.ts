import { NgModule } from '@angular/core';
import { EditAccountComponent } from './edit-account.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
@NgModule({
  imports: [BreadcrumbModule],
  declarations: [EditAccountComponent],
})
export class AccountModule {}
