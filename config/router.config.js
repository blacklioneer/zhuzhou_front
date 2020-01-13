export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority:['admin','user','viewer'],
    routes: [
      // dashboard
      // { path: '/', redirect: '/dashboard/analysis' },
      { path: '/', redirect: '/overview1' },
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   icon: 'dashboard',
      //   routes: [
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'analysis',
      //       component: './Dashboard/Analysis',
      //     },
      //     {
      //       path: '/dashboard/monitor',
      //       name: 'monitor',
      //       component: './Dashboard/Monitor',
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'workplace',
      //       component: './Dashboard/Workplace',
      //     },
      //   ],
      // },
      //overview
      {
        path: '/overview1',
        name: 'overview1',
        icon: 'dashboard',
        authority:['admin','user','viewer'],
        component: './Overview1/Overview',
      },
      //equipment
      {
        path: '/equipment',
        name: 'equipment',
        icon: 'dashboard',
        authority:['admin','user','viewer'],
        routes: [
          {
            path: '/equipment/KD-33',
            name: 'KD-33',
            component: './Equipment/Equipment1',
          },
          {
            path: '/equipment/KD-34',
            name: 'KD-34',
            component: './Equipment/Equipment2',
          },
          {
            path: '/equipment/KD-35',
            name: 'KD-35',
            component: './Equipment/Equipment3',
          },
          {
            path: '/equipment/BPX-11',
            name: 'BPX-11',
            component: './Equipment/Equipment4',
          },
          {
            path: '/equipment/BPX-12',
            name: 'BPX-12',
            component: './Equipment/Equipment5',
          },
          {
            path: '/equipment/BPX-13',
            name: 'BPX-13',
            component: './Equipment/Equipment6',
          },
          // {
          //   path: '/equipment/equipment3',
          //   name: '机床3',
          //   component: './Equipment/Equipment3',
          // },
          // {
          //   path: '/equipment/equipment4',
          //   name: '机床4',
          //   component: './Equipment/Equipment4',
          // },
        ],
      },
      //setting
      {
        path: '/settings',
        name: 'setting',
        icon: 'setting',
        authority: ['admin','user'],
        routes: [
          {
            path: '/settings/user',
            name: 'user',
            authority: ['admin'],
            component: './Settings/User',
          },
          {
            path: '/settings/schedule',
            name: 'order',
            authority: ['user','admin'],
            component: './Settings/ScheduleSetting',
          },
          {
            path: '/settings/error',
            name: 'error',
            authority: ['user','admin'],
            component: './Settings/ErrorSetting',
          },
          {
            path: '/settings/oee',
            name: 'oee',
            authority: ['user','admin'],
            component: './Settings/OeeSetting',
          },
          {
            path: '/settings/maintain',
            name: 'maintain',
            authority: ['user','admin'],
            component: './Settings/MaintainSetting',
          },
          {
            path: '/settings/transmission',
            name: 'transmission',
            authority: ['user','admin'],
            component: './Settings/TransmissionSetting',
          },
          {
            path: '/settings/connect',
            name: 'connect',
            authority: ['user','admin'],
            component: './Settings/ConnectSetting',
          },
          {
            path: '/settings/finishedsetting',
            name: '班次管理',
            authority: ['user','admin'],
            component: './Settings/FinishedTime',
          }
        ]
      },
      // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },
      // list
      // {
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/table-list',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'basiclist',
      //       component: './List/BasicList',
      //     },
      //     {
      //       path: '/list/card-list',
      //       name: 'cardlist',
      //       component: './List/CardList',
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'searchlist',
      //       component: './List/List',
      //       routes: [
      //         {
      //           path: '/list/search',
      //           redirect: '/list/search/articles',
      //         },
      //         {
      //           path: '/list/search/articles',
      //           name: 'articles',
      //           component: './List/Articles',
      //         },
      //         {
      //           path: '/list/search/projects',
      //           name: 'projects',
      //           component: './List/Projects',
      //         },
      //         {
      //           path: '/list/search/applications',
      //           name: 'applications',
      //           component: './List/Applications',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   icon: 'profile',
      //   routes: [
      //     // profile
      //     {
      //       path: '/profile/basic',
      //       name: 'basic',
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/basic/:id',
      //       name: 'basic',
      //       hideInMenu: true,
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'advanced',
      //       authority: ['admin'],
      //       component: './Profile/AdvancedProfile',
      //     },
      //   ],
      // },
      // {
      //   name: 'result',
      //   icon: 'check-circle-o',
      //   path: '/result',
      //   routes: [
      //     // result
      //     {
      //       path: '/result/success',
      //       name: 'success',
      //       component: './Result/Success',
      //     },
      //     { path: '/result/fail', name: 'fail', component: './Result/Error' },
      //   ],
      // },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu:true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
/*      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
           {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },*/
      {
        component: '404',
      },
    ],
  },
];
