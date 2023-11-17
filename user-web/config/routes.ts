export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'Login',
        path: '/user/login',
        component: './User/Login',
      }
    ],
  },
  {
    path: '/tong-quan',
    name: 'Tổng quan',
    icon: 'dashboard',
    component: './tong-quan'
  },
  {
    path: '/nuoc-tho',
    name: 'Nước thô',
    icon: '/icons/menu/home-icon.svg',
    component: './nuoc-tho'
  },
  {
    path: '/lang',
    name: 'Lắng',
    icon: 'table',
    component: './lang',
  },
  { path: '/', redirect: '/tong-quan' },
  { path: '*', component: './404' },
];
