import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {
  NbSidebarModule,
  NbMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbWindowModule,
  NbToastrModule,
  NbChatModule,
  NbTreeGridModule,
  NbCardModule,
} from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './pages/categories/categories.component';
import { PaginatorModule } from './@theme/components/paginator/paginator.module';
import { EditCategoriesComponent } from './pages/edit-categories/edit-categories.component';
import { FormsModule } from '@angular/forms';
import { LocationsComponent } from './pages/locations/locations.component';
import { AddLocationsComponent } from './pages/add-locations/add-locations.component';
import { EditLocationsComponent } from './pages/edit-locations/edit-locations.component';
import { ToursComponent } from './pages/tours/tours.component';
import { EditToursComponent } from './pages/edit-tours/edit-tours.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AddOrdersComponent } from './pages/add-orders/add-orders.component';
import { EditOrdersComponent } from './pages/edit-orders/edit-orders.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { AddCustomersComponent } from './pages/add-customers/add-customers.component';
import { EditCustomersComponent } from './pages/edit-customers/edit-customers.component';
import { AccountComponent } from './pages/account/account.component';
import { AddAccountComponent } from './pages/add-account/add-account.component';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { RoleComponent } from './pages/role/role.component';
import { AddRoleComponent } from './pages/add-role/add-role.component';
import { EditRoleComponent } from './pages/edit-role/edit-role.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { AddPermissionsComponent } from './pages/add-permissions/add-permissions.component';
import { EditPermissionsComponent } from './pages/edit-permissions/edit-permissions.component';
import { AddCategoriesComponent } from './pages/add-categories/add-categories.component';
import { AddToursComponent } from './pages/add-tours/add-tours.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BillComponent } from './pages/bill/bill.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    EditCategoriesComponent,
    LocationsComponent,
    AddLocationsComponent,
    EditLocationsComponent,
    ToursComponent,
    EditToursComponent,
    OrdersComponent,
    AddOrdersComponent,
    EditOrdersComponent,
    CustomersComponent,
    AddCustomersComponent,
    EditCustomersComponent,
    AccountComponent,
    AddAccountComponent,
    EditAccountComponent,
    RoleComponent,
    AddRoleComponent,
    EditRoleComponent,
    PermissionsComponent,
    AddPermissionsComponent,
    EditPermissionsComponent,
    AddCategoriesComponent,
    AddToursComponent,
    DashboardComponent,
    BillComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbTreeGridModule,
    NbCardModule,
    PaginatorModule,
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
