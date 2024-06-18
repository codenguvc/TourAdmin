import { NgModule } from '@angular/core';
import { AddRoleComponent } from './add-role.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  imports: [CommonModule, FormsModule, BreadcrumbModule],
  declarations: [AddRoleComponent],
})
export class AddRoleModule {}
