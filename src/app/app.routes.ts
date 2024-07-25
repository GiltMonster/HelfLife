import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./navigation/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'user',
    loadComponent: () => import('./navigation/user/user.page').then( m => m.UserPage)
  },
  {
    path: 'create',
    loadComponent: () => import('./navigation/clipboard/create/create.page').then( m => m.CreatePage)
  },
  {
    path: 'edit',
    loadComponent: () => import('./navigation/clipboard/edit/edit.page').then( m => m.EditPage)
  },
];
