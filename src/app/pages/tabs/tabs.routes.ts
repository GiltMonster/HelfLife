import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ClipboardPage } from '../clipboard/clipboard.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'clipboard',
        loadComponent: () =>
          import('../clipboard/clipboard.page').then((m) => m.ClipboardPage),
        children: [
          {
            path: 'create',
            loadComponent: () =>
              import('../clipboard/create/create.page').then((m) => m.CreatePage),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('../clipboard/edit/edit.page').then((m) => m.EditPage),
          },
          {
            path: '',
            component: ClipboardPage,
          }
        ]
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'camera',
        loadComponent: () =>
          import('../camera/camera.page').then((m) => m.CameraPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../user/user.page').then((m) => m.UserPage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
