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
    path: '/calendar',
    name: 'Calendar',
    icon: 'export',
    component: './Calendar',
  },
  {
    path: '/export-data',
    name: 'Export Data',
    icon: 'export',
    component: './ExportData',
  },

  { path: '/', redirect: '/product-monitoring-system' },
  { path: '*', component: './404' },
];
