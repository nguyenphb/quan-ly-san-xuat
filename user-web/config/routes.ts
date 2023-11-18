export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'Login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/tong-quan',
    name: 'Tổng quan',
    icon: 'dashboard',
    component: './tong-quan',
  },
  {
    path: '/nuoc-tho',
    name: 'Nước thô',
    icon: '/icons/menu/home-icon.svg',
    component: './nuoc-tho',
  },
  {
    path: '/lang',
    name: 'Lắng',
    icon: 'table',
    component: './lang',
  },
  {
    path: '/product-monitoring-system',
    name: 'Product Monitoring System',
    icon: 'dashboard',
    component: './ProductMonitorSystem',
  },
  {
    path: '/mentos-monitoring-board',
    name: 'Mentos Monitoring Board',
    icon: 'dashboard',
    component: './MentosMonitoringBoard',
  },
  {
    path: '/export-data',
    name: 'Export Data',
    icon: 'dashboard',
    component: './ExportData',
  },
  { path: '/', redirect: '/tong-quan' },
  { path: '*', component: './404' },
];
