import { NgModule } from '@angular/core';
import { PermissionsComponent } from './permissions.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [PermissionsComponent],
})
export class PermissionsModule {}
