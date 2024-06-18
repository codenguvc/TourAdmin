import { NgModule } from '@angular/core';
import { EditRoleComponent } from './edit-role.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  imports: [CommonModule, FormsModule, BreadcrumbModule],
  declarations: [EditRoleComponent],
})
export class EditRoleModule {}
