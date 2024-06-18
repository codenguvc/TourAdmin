import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Quản lí',
    group: true,
  },
  {
    title: 'Tài khoản',
    icon: 'person-add-outline',
    link: '/pages/accounts',
  },
  {
    title: 'Vai trò',
    icon: 'people-outline',
    link: '/pages/roles',
  },
  {
    title: 'Quyền',
    icon: 'shield-outline',
    link: '/pages/permissions',
  },

  {
    title: 'Danh mục',
    icon: 'list-outline',
    link: '/pages/categories',
  },
  {
    title: 'Địa điểm',
    icon: 'pin-outline',
    link: '/pages/locations',
  },
  {
    title: 'Quản lí chuyến đi',
    icon: 'briefcase-outline',
    link: '/pages/tours',
  },
  {
    title: 'Đơn hàng',
    icon: 'shopping-cart-outline',
    link: '/pages/orders',
  },
  {
    title: 'Khách hàng',
    icon: 'person-outline',
    link: '/pages/customers',
  },
];
