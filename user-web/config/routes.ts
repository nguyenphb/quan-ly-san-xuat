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
    path: '/product-monitoring-system',
    name: 'Products Overview',
    icon: 'dashboard',
    component: './MentosMonitoringBoard',
  },
  {
    path: '/mentos-monitoring-board',
    name: 'Monitoring Board',
    icon: 'table',
    component: './ProductMonitorSystem',
  },
  {
    path: '/export-data',
    name: 'Export Data',
    icon: 'exp',
    component: './ExportData',
  },
  { path: '/', redirect: '/product-monitoring-system' },
  { path: '*', component: './404' },
];
