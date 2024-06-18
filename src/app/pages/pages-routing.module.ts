import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { LocationsComponent } from './locations/locations.component';
import { ToursComponent } from './tours/tours.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomersComponent } from './customers/customers.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { AddLocationsComponent } from './add-locations/add-locations.component';
import { EditLocationsComponent } from './edit-locations/edit-locations.component';
import { AddToursComponent } from './add-tours/add-tours.component';
import { EditToursComponent } from './edit-tours/edit-tours.component';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { EditCustomersComponent } from './edit-customers/edit-customers.component';
import { AccountComponent } from './account/account.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { RoleComponent } from './role/role.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { AddPermissionsComponent } from './add-permissions/add-permissions.component';
import { EditPermissionsComponent } from './edit-permissions/edit-permissions.component';
import { BillComponent } from './bill/bill.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        data: { breadcrumb: 'Danh mục' },
      },
      {
        path: 'locations',
        component: LocationsComponent,
        data: { breadcrumb: 'Địa điểm' },
      },
      {
        path: 'tours',
        component: ToursComponent,
        data: { breadcrumb: 'Quản lí tua' },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: { breadcrumb: 'Đơn hàng' },
      },
      {
        path: 'customers',
        component: CustomersComponent,
        data: { breadcrumb: 'Khách hàng' },
      },
      {
        path: 'add-categories',
        component: AddCategoriesComponent,
        data: { breadcrumb: 'Thêm mới danh mục' },
      },
      {
        path: 'edit-categories/:id',
        component: EditCategoriesComponent,
        data: { breadcrumb: 'Chỉnh sửa danh mục' },
      },
      {
        path: 'add-locations',
        component: AddLocationsComponent,
        data: { breadcrumb: 'Thêm địa điểm' },
      },
      {
        path: 'edit-locations/:id',
        component: EditLocationsComponent,
        data: { breadcrumb: 'Sửa địa điểm' },
      },
      {
        path: 'add-tours',
        component: AddToursComponent,
        data: { breadcrumb: 'Thêm tua' },
      },
      {
        path: 'edit-tours/:id',
        component: EditToursComponent,
        data: { breadcrumb: 'Sửa tua' },
      },
      {
        path: 'add-orders',
        component: AddOrdersComponent,
        data: { breadcrumb: 'Thêm đơn hàng' },
      },
      {
        path: 'edit-orders/:id',
        component: EditOrdersComponent,
        data: { breadcrumb: 'Chỉnh sửa đơn hàng' },
      },
      {
        path: 'add-customers',
        component: AddCustomersComponent,
        data: { breadcrumb: 'Thêm khách hàng' },
      },
      {
        path: 'edit-customers/:id',
        component: EditCustomersComponent,
        data: { breadcrumb: 'Chỉnh sửa khách hàng' },
      },
      {
        path: 'accounts',
        component: AccountComponent,
        data: { breadcrumb: 'Tài khoản' },
      },
      {
        path: 'add-accounts',
        component: AddAccountComponent,
        data: { breadcrumb: 'Thêm tài khoản' },
      },
      {
        path: 'edit-accounts/:id',
        component: EditAccountComponent,
        data: { breadcrumb: 'Chỉnh sửa tài khoản' },
      },
      {
        path: 'roles',
        component: RoleComponent,
        data: { breadcrumb: 'Danh sách vai trò' },
      },
      {
        path: 'add-role',
        component: AddRoleComponent,
        data: { breadcrumb: 'Thêm vai trò' },
      },
      {
        path: 'edit-role/:id',
        component: EditRoleComponent,
        data: { breadcrumb: 'Chỉnh sửa vai trò' },
      },
      {
        path: 'permissions',
        component: PermissionsComponent,
        data: { breadcrumb: 'Chỉnh sửa quyền' },
      },
      {
        path: 'add-permissions',
        component: AddPermissionsComponent,
        data: { breadcrumb: 'Thêm quyền' },
      },
      {
        path: 'edit-permissions/:id',
        component: EditPermissionsComponent,
        data: { breadcrumb: 'Chỉnh sửa quyền' },
      },
      {
        path: 'bill/:id',
        component: BillComponent,
        data: { breadcrumb: 'Xuất hóa đơn' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
