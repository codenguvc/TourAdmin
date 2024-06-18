import { NgModule } from '@angular/core';
import { EditToursComponent } from './edit-tours.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BreadcrumbModule, FormsModule],
  declarations: [EditToursComponent],
})
export class EditToursModule {}
